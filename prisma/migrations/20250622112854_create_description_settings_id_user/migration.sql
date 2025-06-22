/*
  Warnings:

  - You are about to drop the column `description_settings_id` on the `Years` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "description_settings_id" INTEGER;

-- AlterTable
ALTER TABLE "Years" DROP COLUMN "description_settings_id";
