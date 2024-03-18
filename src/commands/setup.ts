import { db } from '../db/db'
import { packages } from '../db/schema'

const initialPackages = [
  // 47ng
  'nuqs',
  'next-usequerystate',
  'prisma-field-encryption',
  // Popular packages
  'axios',
  'esbuild',
  'express',
  'fastify',
  'next',
  'nuxt',
  'preact',
  'prettier',
  'react',
  'svelte',
  'tailwindcss',
  'typescript',
  'vite',
  'vue',
  'zod',
]

for (const pkg of initialPackages) {
  try {
    await db.insert(packages).values({ name: pkg }).execute()
  } catch (error) {
    console.error('Skipping seeding initial package %s', pkg)
  }
}
