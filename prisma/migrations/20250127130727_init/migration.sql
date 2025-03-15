-- CreateTable
CREATE TABLE "Info" (
    "id" SERIAL NOT NULL,
    "emp_name" TEXT NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Info_emp_id_key" ON "Info"("emp_id");

-- CreateIndex
CREATE UNIQUE INDEX "Info_email_key" ON "Info"("email");
