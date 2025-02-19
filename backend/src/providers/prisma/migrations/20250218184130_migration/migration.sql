-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `googleId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `profilePicture` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Users_email_key`(`email`),
    UNIQUE INDEX `Users_googleId_key`(`googleId`),
    INDEX `Users_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimonial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `space_name` VARCHAR(191) NOT NULL,
    `space_logo_url` VARCHAR(191) NOT NULL,
    `space_logo_type` BOOLEAN NOT NULL DEFAULT false,
    `title` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `questions` VARCHAR(191) NOT NULL,
    `collect_extra_info` VARCHAR(191) NOT NULL,
    `collection_type` VARCHAR(191) NOT NULL,
    `choose_theme` VARCHAR(191) NOT NULL,
    `start_rating` BOOLEAN NOT NULL DEFAULT false,
    `image_url` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExtraTestimonialInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thankyou_title` VARCHAR(191) NOT NULL,
    `thankyou_message` VARCHAR(191) NOT NULL,
    `question_label` VARCHAR(191) NOT NULL,
    `max_video_duration` INTEGER NOT NULL,
    `video_button_text` VARCHAR(191) NOT NULL,
    `text_button_text` VARCHAR(191) NOT NULL,
    `button_color` VARCHAR(191) NOT NULL,
    `consent_display` VARCHAR(191) NOT NULL,
    `consent_statement` VARCHAR(191) NOT NULL,
    `testimonial_id` INTEGER NOT NULL,

    UNIQUE INDEX `ExtraTestimonialInfo_testimonial_id_key`(`testimonial_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender_name` VARCHAR(191) NOT NULL,
    `reply_address` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `testimonial_id` INTEGER NOT NULL,

    UNIQUE INDEX `Notification_testimonial_id_key`(`testimonial_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Testimonial` ADD CONSTRAINT `Testimonial_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExtraTestimonialInfo` ADD CONSTRAINT `ExtraTestimonialInfo_testimonial_id_fkey` FOREIGN KEY (`testimonial_id`) REFERENCES `Testimonial`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_testimonial_id_fkey` FOREIGN KEY (`testimonial_id`) REFERENCES `Testimonial`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
