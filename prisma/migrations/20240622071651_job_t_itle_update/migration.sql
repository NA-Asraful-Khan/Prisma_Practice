/*
  Warnings:

  - Added the required column `jobTitle` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` ADD COLUMN `jobTitle` VARCHAR(191) NOT NULL;
