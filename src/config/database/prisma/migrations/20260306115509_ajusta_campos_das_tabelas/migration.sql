/*
  Warnings:

  - You are about to drop the `_MoviesToProducers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_MoviesToProducers_B_index";

-- DropIndex
DROP INDEX "_MoviesToProducers_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_MoviesToProducers";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_MovieProducers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MovieProducers_A_fkey" FOREIGN KEY ("A") REFERENCES "Movies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MovieProducers_B_fkey" FOREIGN KEY ("B") REFERENCES "Producers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Movies" ("id", "title", "winner", "year") SELECT "id", "title", "winner", "year" FROM "Movies";
DROP TABLE "Movies";
ALTER TABLE "new_Movies" RENAME TO "Movies";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_MovieProducers_AB_unique" ON "_MovieProducers"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieProducers_B_index" ON "_MovieProducers"("B");
