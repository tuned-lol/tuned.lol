import { relations } from 'drizzle-orm';
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable(
  'user',
  {
    id: text('id').notNull().primaryKey(),
    googleId: text('google_id').notNull().unique(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    image: text('image').notNull(),
    createdAt: integer('created_at').notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex('email_idx').on(table.email),
  }),
);

export const userRelations = relations(userTable, ({ many }) => ({
  likes: many(likeTable),
  comments: many(commentTable),
}));

export const sessionTable = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  expiresAt: integer('expires_at').notNull(),
});

export const cupTable = sqliteTable(
  'cup',
  {
    id: text('id').notNull().primaryKey(),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    description: text('description').notNull(),
    userId: text('user_id').references(() => userTable.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    createdAt: integer('created_at').notNull(),
    likes: integer('likes').notNull().default(0),
    comments: integer('comments').notNull().default(0),
  },
  (table) => {
    return {
      slugIdx: uniqueIndex('slug_idx').on(table.slug),
    };
  },
);

export const cupRelations = relations(cupTable, ({ one }) => ({
  user: one(userTable, {
    fields: [cupTable.userId],
    references: [userTable.id],
  }),
}));

export const likeTable = sqliteTable('like', {
  id: text('id').notNull().primaryKey(),
  cupId: text('cup_id')
    .notNull()
    .references(() => cupTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  userId: text('user_id').references(() => userTable.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  createdAt: integer('created_at').notNull(),
});

export const commentTable = sqliteTable(
  'comment',
  {
    id: text('id').notNull().primaryKey(),
    cupId: text('cup_id')
      .notNull()
      .references(() => cupTable.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    userId: text('user_id').references(() => userTable.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    content: text('content').notNull(),
    createdAt: integer('created_at').notNull(),
  },
  (table) => ({
    userIdIdx: uniqueIndex('user_id_idx').on(table.userId),
  }),
);

export const schema = {
  user: userTable,
  session: sessionTable,
  cup: cupTable,
  like: likeTable,
  comment: commentTable,
};
