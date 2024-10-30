import { pgTable, PgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { posts } from "./post.model";
import { comments } from "./comment.model";

export const users = pgTable('users', {
    id: text('id').primaryKey().notNull(),
    username: text('username').notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at'),
});

export const userRelations = relations(users, ({ many }) => ({
    posts: many(posts),
    comment: many(comments),
}));
