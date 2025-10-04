-- DropForeignKey
ALTER TABLE "pItem" DROP CONSTRAINT "pItem_pId_fkey";

-- AddForeignKey
ALTER TABLE "pItem" ADD CONSTRAINT "pItem_pId_fkey" FOREIGN KEY ("pId") REFERENCES "p"("id") ON DELETE CASCADE ON UPDATE CASCADE;
