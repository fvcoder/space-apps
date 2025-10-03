/*
  Warnings:

  - You are about to drop the column `items` on the `p` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "p" DROP COLUMN "items";

-- CreateTable
CREATE TABLE "pItem" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT,
    "pId" TEXT NOT NULL,
    "deliveredDate" TIMESTAMP(3),
    "deliveredUserId" TEXT,

    CONSTRAINT "pItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pItem" ADD CONSTRAINT "pItem_pId_fkey" FOREIGN KEY ("pId") REFERENCES "p"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
