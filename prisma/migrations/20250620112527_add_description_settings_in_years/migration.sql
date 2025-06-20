/*
  Warnings:

  - You are about to drop the column `description_settings_id` on the `Goals` table. All the data in the column will be lost.
  - Added the required column `description_settings_id` to the `Years` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goals" DROP COLUMN "description_settings_id";

-- AlterTable
ALTER TABLE "Years" ADD COLUMN     "description_settings_id" INTEGER NOT NULL;
