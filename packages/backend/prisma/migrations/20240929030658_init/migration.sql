-- CreateTable
CREATE TABLE "eventos" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "tipo" VARCHAR(100) NOT NULL,
    "endereco" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(20),
    "local_id" UUID,
    "data_inicio" TIMESTAMP(6) NOT NULL,
    "data_fim" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locais" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "tipo" VARCHAR(100) NOT NULL,
    "endereco" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(20),
    "apelido" VARCHAR(255),
    "cnpj" VARCHAR(20),
    "complemento" VARCHAR(255),
    "cidade" VARCHAR(255) NOT NULL,
    "uf" VARCHAR(2) NOT NULL,
    "cep" VARCHAR(20) NOT NULL,
    "entradas" TEXT[],
    "catracas" TEXT[],
    "atualizacao" TIMESTAMP(6),

    CONSTRAINT "locais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unq_evento_local_horario" ON "eventos"("local_id", "data_inicio", "data_fim");

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "locais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
