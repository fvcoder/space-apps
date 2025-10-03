/*
  Warnings:

  - Added the required column `ci` to the `p` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "p" ADD COLUMN     "ci" TEXT NOT NULL;
