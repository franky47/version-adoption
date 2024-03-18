import { z } from "zod";

const npmStatsSchema = z.object({
  package: z.string(),
  downloads: z.record(z.number()),
});

export async function fetchNpmStats(pkg: string) {
  const url = `https://api.npmjs.org/versions/${pkg}/last-week`;
  const res = await fetch(url).then((res) => res.json());
  return npmStatsSchema.parse(res).downloads;
}

export function sortDownloads(downloads: Record<string, number>) {
  return Object.fromEntries(
    Object.entries(downloads).sort((a, b) => b[1] - a[1])
  );
}

export function getTotalDownloads(downloads: Record<string, number>) {
  return Object.values(downloads).reduce((acc, curr) => acc + curr, 0);
}
