/*
  Warnings:

  - You are about to drop the column `name` on the `Statuses` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Statuses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Statuses" ("created_at", "id", "key", "updated_at") SELECT "created_at", "id", "key", "updated_at" FROM "Statuses";
DROP TABLE "Statuses";
ALTER TABLE "new_Statuses" RENAME TO "Statuses";
CREATE UNIQUE INDEX "Statuses_key_key" ON "Statuses"("key");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
