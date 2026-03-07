-- CreateTable
CREATE TABLE "Movies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "winner" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Producers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MoviesToProducers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MoviesToProducers_A_fkey" FOREIGN KEY ("A") REFERENCES "Movies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MoviesToProducers_B_fkey" FOREIGN KEY ("B") REFERENCES "Producers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_MoviesToProducers_AB_unique" ON "_MoviesToProducers"("A", "B");

-- CreateIndex
CREATE INDEX "_MoviesToProducers_B_index" ON "_MoviesToProducers"("B");
