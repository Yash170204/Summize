/*
  Warnings:

  - You are about to drop the column `UserId` on the `pdfSummary` table. All the data in the column will be lost.
  - Added the required column `userId` to the `pdfSummary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pdfSummary" DROP CONSTRAINT "pdfSummary_UserId_fkey";

-- AlterTable
ALTER TABLE "pdfSummary" DROP COLUMN "UserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pdfSummary" ADD CONSTRAINT "pdfSummary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
