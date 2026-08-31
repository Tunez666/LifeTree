-- AlterTable
ALTER TABLE "task" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "start_date" DROP NOT NULL,
ALTER COLUMN "due_date" DROP NOT NULL,
ALTER COLUMN "all_day" DROP NOT NULL;

-- AlterTable
ALTER TABLE "workspace" ALTER COLUMN "description" DROP NOT NULL;
