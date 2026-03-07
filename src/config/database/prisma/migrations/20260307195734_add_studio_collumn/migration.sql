/*
  Warnings:

  - Added the required column `studio` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "studio" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Movies" ("id", "title", "winner", "year") SELECT "id", "title", "winner", "year" FROM "Movies";
DROP TABLE "Movies";
ALTER TABLE "new_Movies" RENAME TO "Movies";
CREATE UNIQUE INDEX "Movies_title_key" ON "Movies"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
