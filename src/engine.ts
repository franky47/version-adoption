import { db } from "./db/db";
import { records } from "./db/schema";
import { fetchNpmStats, getTotalDownloads, sortDownloads } from "./npm";

export async function run() {
  const pkgs = await db.query.packages.findMany({
    columns: {
      name: true,
    },
  });
  for (const { name: pkg } of pkgs) {
    await processPackage(pkg);
  }
}

async function processPackage(pkg: string) {
  const tick = performance.now();
  const downloads = sortDownloads(await fetchNpmStats(pkg));
  const total = getTotalDownloads(downloads);
  await db.insert(records).values({
    package: pkg,
    versions: downloads,
    total,
  });
  const tock = performance.now();
  console.log(`Processed ${pkg} (${(tock - tick).toFixed(2)}ms)`);
}
