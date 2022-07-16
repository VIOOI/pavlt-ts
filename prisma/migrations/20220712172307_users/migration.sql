-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CREATER', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_name" VARCHAR(50) NOT NULL,
    "user_email" VARCHAR(100) NOT NULL,
    "user_password" VARCHAR(200) NOT NULL,
    "user_first_nama" VARCHAR(100) NOT NULL,
    "user_last_nama" VARCHAR(100) NOT NULL,
    "user_birdth_date" DATE NOT NULL,
    "user_role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);
