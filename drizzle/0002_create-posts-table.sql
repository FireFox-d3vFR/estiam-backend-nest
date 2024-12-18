CREATE TABLE IF NOT EXISTS "posts" (
    "id" text PRIMARY KEY NOT NULL,
    "title" text NOT NULL,
    "content" text NOT NULL,
    "user_id" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp,
    CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);
