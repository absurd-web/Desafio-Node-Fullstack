/*
  Warnings:

  - You are about to drop the `eventos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `locais` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "eventos" DROP CONSTRAINT "eventos_local_id_fkey";

-- DropTable
DROP TABLE "eventos";

-- DropTable
DROP TABLE "locais";

-- CreateTable
CREATE TABLE "Evento" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "tipo" VARCHAR(100) NOT NULL,
    "endereco" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(20),
    "local_id" INTEGER,
    "data_inicio" TIMESTAMP(6) NOT NULL,
    "data_fim" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Local" (
    "id" SERIAL NOT NULL,
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

    CONSTRAINT "Local_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unq_evento_local_horario" ON "Evento"("local_id", "data_inicio", "data_fim");

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "Local"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
