-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DescriptionSettings" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "DescriptionSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Years" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "can_edit_past" BOOLEAN NOT NULL DEFAULT false,
    "show_statistic" BOOLEAN NOT NULL DEFAULT true,
    "description_settings_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Years_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statuses" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status_id" INTEGER NOT NULL,
    "year_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DescriptionSettings_value_key" ON "DescriptionSettings"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Years_user_id_year_key" ON "Years"("user_id", "year");

-- CreateIndex
CREATE UNIQUE INDEX "Statuses_key_key" ON "Statuses"("key");
