/*
  Warnings:

  - Made the column `local_id` on table `Evento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `atualizacao` on table `Local` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_local_id_fkey";

-- DropIndex
DROP INDEX "unq_evento_local_horario";

-- AlterTable
ALTER TABLE "Evento" ALTER COLUMN "local_id" SET NOT NULL,
ALTER COLUMN "data_inicio" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "data_fim" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Local" ALTER COLUMN "atualizacao" SET NOT NULL,
ALTER COLUMN "atualizacao" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "atualizacao" SET DATA TYPE TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "Local"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
