-- DropForeignKey
ALTER TABLE "Entry" DROP CONSTRAINT "Entry_userId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_entryId_fkey";

-- AlterTable
ALTER TABLE "Entry" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "entryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
