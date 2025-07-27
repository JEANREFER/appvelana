-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('marie', 'organisateur', 'prestataire', 'invite') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isValidated` BOOLEAN NOT NULL DEFAULT false,
    `company` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wedding` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `couple_name` VARCHAR(191) NOT NULL,
    `wedding_date` DATETIME(3) NOT NULL,
    `budget` DOUBLE NOT NULL DEFAULT 0.0,
    `created_by` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `response` VARCHAR(191) NOT NULL DEFAULT 'En attente',
    `numGuests` INTEGER NOT NULL DEFAULT 1,
    `comment` VARCHAR(191) NULL,
    `weddingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guestfamily` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prénom` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `family` VARCHAR(191) NOT NULL,
    `centresInteret` VARCHAR(191) NOT NULL,
    `guestid` INTEGER NOT NULL,
    `weddingId` INTEGER NOT NULL,
    `group` VARCHAR(191) NOT NULL DEFAULT 'Famille',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `due_date` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'À faire',
    `completed` BOOLEAN NOT NULL DEFAULT false,
    `weddingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `siren` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `price` INTEGER NULL,
    `imageUrl` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `contact` VARCHAR(191) NULL,
    `validated` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0,
    `ratings` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Vendor_siren_key`(`siren`),
    UNIQUE INDEX `Vendor_email_key`(`email`),
    UNIQUE INDEX `Vendor_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserVendor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `weddingId` INTEGER NOT NULL,
    `vendorId` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `custom` BOOLEAN NOT NULL DEFAULT false,
    `city` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `price` INTEGER NULL,
    `deposit` INTEGER NULL,
    `paid` BOOLEAN NOT NULL DEFAULT false,
    `note` INTEGER NULL,
    `isApproved` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `UserVendor_userId_vendorId_weddingId_key`(`userId`, `vendorId`, `weddingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL DEFAULT 0.0,
    `weddingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BudgetEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `type` ENUM('depense', 'revenu') NOT NULL,
    `weddingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `targetDate` DATETIME(3) NULL,
    `weddingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'À faire',
    `due_date` DATETIME(3) NULL,
    `weddingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transport` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'À faire',
    `due_date` DATETIME(3) NULL,
    `weddingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Accommodation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'À faire',
    `due_date` DATETIME(3) NULL,
    `weddingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ceremony` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NULL,
    `location` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'À faire',
    `due_date` DATETIME(3) NULL,
    `weddingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Animation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `weddingId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `performer` VARCHAR(191) NULL,
    `time` VARCHAR(191) NULL,
    `contact` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Outfit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `person` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `details` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `weddingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Other` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'À faire',
    `due_date` DATETIME(3) NULL,
    `weddingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserWeddingAccess` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `weddingId` INTEGER NOT NULL,

    UNIQUE INDEX `UserWeddingAccess_userId_weddingId_key`(`userId`, `weddingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Milestone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `weddingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuoteRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `vendorId` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuoteResponse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quoteRequestId` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `pdfUrl` VARCHAR(191) NULL,
    `sentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `QuoteResponse_quoteRequestId_key`(`quoteRequestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VendorMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senderId` INTEGER NOT NULL,
    `receiverId` INTEGER NOT NULL,
    `vendorId` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `sentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VendorActivity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendorId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `imageUrls` VARCHAR(191) NULL,
    `location` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VendorDiscount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendorId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `discount` DOUBLE NOT NULL,
    `validUntil` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wedding` ADD CONSTRAINT `Wedding_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Guest` ADD CONSTRAINT `Guest_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Guestfamily` ADD CONSTRAINT `Guestfamily_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vendor` ADD CONSTRAINT `Vendor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserVendor` ADD CONSTRAINT `UserVendor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserVendor` ADD CONSTRAINT `UserVendor_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserVendor` ADD CONSTRAINT `UserVendor_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Provider` ADD CONSTRAINT `Provider_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BudgetEntry` ADD CONSTRAINT `BudgetEntry_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Meal` ADD CONSTRAINT `Meal_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transport` ADD CONSTRAINT `Transport_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Accommodation` ADD CONSTRAINT `Accommodation_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ceremony` ADD CONSTRAINT `Ceremony_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Animation` ADD CONSTRAINT `Animation_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Outfit` ADD CONSTRAINT `Outfit_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Other` ADD CONSTRAINT `Other_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWeddingAccess` ADD CONSTRAINT `UserWeddingAccess_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWeddingAccess` ADD CONSTRAINT `UserWeddingAccess_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Milestone` ADD CONSTRAINT `Milestone_weddingId_fkey` FOREIGN KEY (`weddingId`) REFERENCES `Wedding`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuoteRequest` ADD CONSTRAINT `QuoteRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuoteRequest` ADD CONSTRAINT `QuoteRequest_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuoteResponse` ADD CONSTRAINT `QuoteResponse_quoteRequestId_fkey` FOREIGN KEY (`quoteRequestId`) REFERENCES `QuoteRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendorMessage` ADD CONSTRAINT `VendorMessage_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendorMessage` ADD CONSTRAINT `VendorMessage_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendorMessage` ADD CONSTRAINT `VendorMessage_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendorActivity` ADD CONSTRAINT `VendorActivity_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VendorDiscount` ADD CONSTRAINT `VendorDiscount_vendorId_fkey` FOREIGN KEY (`vendorId`) REFERENCES `Vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
