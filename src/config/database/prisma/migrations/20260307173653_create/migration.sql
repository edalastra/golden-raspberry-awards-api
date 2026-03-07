/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Movies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movies_title_key" ON "Movies"("title");
