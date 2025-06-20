/*
  Warnings:

  - Added the required column `description_settings_id` to the `Years` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Goals_year_id_user_id_status_id_idx";

-- DropIndex
DROP INDEX "Users_email_idx";

-- DropIndex
DROP INDEX "Years_user_id_idx";

-- AlterTable
ALTER TABLE "Years" ADD COLUMN     "description_settings_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DescriptionSettings" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "DescriptionSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DescriptionSettings_value_key" ON "DescriptionSettings"("value");
