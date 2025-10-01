-- CreateTable
CREATE TABLE "participant" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "type" TEXT NOT NULL,
    "package" TEXT NOT NULL,
    "dinner" JSONB NOT NULL DEFAULT '{}',
    "breakfast" JSONB NOT NULL DEFAULT '{}',
    "launch1" JSONB NOT NULL DEFAULT '{}',
    "launch2" JSONB NOT NULL DEFAULT '{}',
    "extra" JSONB NOT NULL DEFAULT '{}',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "participant_pkey" PRIMARY KEY ("id")
);
