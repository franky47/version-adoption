import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const packages = sqliteTable('packages', {
  name: text('name').primaryKey(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export const records = sqliteTable('records', {
  package: text('package')
    .notNull()
    .references(() => packages.name),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  versions: text('versions', { mode: 'json' }).notNull(),
  versionsCount: integer('versions_count').notNull(),
  totalDownloads: integer('total_downloads').notNull(),
})
