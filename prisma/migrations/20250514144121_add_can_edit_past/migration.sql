-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Years" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "can_edit_past" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Years" ("created_at", "id", "updated_at", "user_id", "year") SELECT "created_at", "id", "updated_at", "user_id", "year" FROM "Years";
DROP TABLE "Years";
ALTER TABLE "new_Years" RENAME TO "Years";
CREATE INDEX "Years_user_id_idx" ON "Years"("user_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
