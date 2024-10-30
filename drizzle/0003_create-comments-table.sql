CREATE TABLE IF NOT EXISTS "comments" (
    "id" text PRIMARY KEY NOT NULL,
    "content" text NOT NULL,
    "post_id" text NOT NULL,
    "user_id" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp,
    CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts" ("id"),
    CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);
