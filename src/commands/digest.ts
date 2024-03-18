import { and, asc, eq } from 'drizzle-orm'
import { parseArgs } from 'util'
import { db } from '../db/db'
import { records } from '../db/schema'

const { positionals } = parseArgs({
  args: Bun.argv,
  strict: true,
  allowPositionals: true,
})

const pkg = positionals[2]

const results = await db.query.records.findMany({
  where: and(eq(records.package, pkg)),
  orderBy: asc(records.createdAt),
})
results.forEach((record) => {
  console.log(
    JSON.stringify({
      date: new Date(record.createdAt).toISOString().slice(0, 10),
      package: record.package,
      versionsCount: record.versionsCount,
      totalDownloads: record.totalDownloads,
      downloads: record.versions,
    })
  )
})
