/*
  Warnings:

  - You are about to drop the column `email` on the `customers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "customers_email_key";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "operators" ADD COLUMN     "hasChangedPassword" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "operator_customers" (
    "id" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "operator_customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nodos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "topicMqtt" TEXT NOT NULL,
    "topicMqtt2" TEXT NOT NULL,
    "topicMqtt3" TEXT NOT NULL,
    "macAddress" TEXT NOT NULL,
    "hostnameOta" TEXT NOT NULL,
    "mqttId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "hardwareVersion" TEXT NOT NULL,
    "softwareVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "nodos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nodos_macAddress_key" ON "nodos"("macAddress");

-- AddForeignKey
ALTER TABLE "operator_customers" ADD CONSTRAINT "operator_customers_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "operators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operator_customers" ADD CONSTRAINT "operator_customers_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nodos" ADD CONSTRAINT "nodos_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
