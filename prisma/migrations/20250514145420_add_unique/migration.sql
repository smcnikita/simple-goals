/*
  Warnings:

  - A unique constraint covering the columns `[user_id,year]` on the table `Years` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Years_user_id_year_key" ON "Years"("user_id", "year");
