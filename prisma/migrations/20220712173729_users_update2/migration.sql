/*
  Warnings:

  - You are about to drop the column `user_first_nama` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_last_nama` on the `users` table. All the data in the column will be lost.
  - Added the required column `user_first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_last_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_first_nama",
DROP COLUMN "user_last_nama",
ADD COLUMN     "user_first_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "user_last_name" VARCHAR(100) NOT NULL;
