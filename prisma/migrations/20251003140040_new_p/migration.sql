-- CreateTable
CREATE TABLE "p" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "codeDate" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "package" TEXT NOT NULL,
    "items" JSONB NOT NULL DEFAULT '[]',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "p_pkey" PRIMARY KEY ("id")
);
