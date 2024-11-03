import { createId } from "@paralleldrive/cuid2";
import { pgTable, text } from "drizzle-orm/pg-core";
import { timestamps } from "./database-helpers";

// Table des utilisateurs
export const users = pgTable('users', {
    id: text()
        .primaryKey()
        .$defaultFn(() => createId()),
    username: text().notNull().unique(),
    password: text().notNull(),
    ...timestamps,
});

// Table des posts
export const posts = pgTable('posts', {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),
    title: text().notNull(),
    content: text().notNull(),
    userId: text().references(() => users.id).notNull(),
    ...timestamps,
  });

// Table des commentaires
export const comments = pgTable('comments', {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),
    content: text().notNull(),
    postId: text().references(() => posts.id).notNull(),
    userId: text().references(() => users.id).notNull(),
    ...timestamps,
  });

// Schéma de la base de données
export const databaseSchema = {
    users,
    posts,
    comments,
}
