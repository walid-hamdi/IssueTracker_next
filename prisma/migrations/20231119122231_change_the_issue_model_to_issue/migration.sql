-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `issue_assignedToUserId_fkey`;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
