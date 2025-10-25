-- AlterEnum
ALTER TYPE "RoomStatus" ADD VALUE 'FULL';

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "participants" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
