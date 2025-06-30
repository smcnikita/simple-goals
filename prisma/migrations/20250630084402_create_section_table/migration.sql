-- AlterTable
ALTER TABLE "Goals" ADD COLUMN     "section_id" INTEGER;

-- CreateTable
CREATE TABLE "Section" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "years_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Years" ADD CONSTRAINT "Years_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_year_id_fkey" FOREIGN KEY ("year_id") REFERENCES "Years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_years_id_fkey" FOREIGN KEY ("years_id") REFERENCES "Years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
