import { parseArgs } from 'util'
import { db } from './db/db'
import { packages } from './db/schema'

const { positionals } = parseArgs({
  args: Bun.argv,
  strict: true,
  allowPositionals: true,
})

const pkg = positionals[2]

db.insert(packages).values({ name: pkg }).execute()
