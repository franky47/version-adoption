import { db } from '../db/db'
import { records } from '../db/schema'
import { fetchNpmStats, getTotalDownloads, sortDownloads } from '../npm'

async function ingest() {
  const pkgs = await db.query.packages.findMany({
    columns: {
      name: true,
    },
  })
  for (const { name: pkg } of pkgs) {
    await processPackage(pkg)
  }
}

async function processPackage(pkg: string) {
  const tick = performance.now()
  const downloads = sortDownloads(await fetchNpmStats(pkg))
  const totalDownloads = getTotalDownloads(downloads)
  await db.insert(records).values({
    package: pkg,
    versions: downloads,
    versionsCount: Object.keys(downloads).length,
    totalDownloads,
  })
  const tock = performance.now()
  const now = new Date().toISOString()
  console.log(`${now} Processed ${pkg} (${(tock - tick).toFixed(2)}ms)`)
}

ingest()
