import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { artistsData } from './songsData'

const prisma = new PrismaClient()

const run = async () => {
  // Seed data
  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: {
          name: artist.name,
        },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      })
    })
  )

  // Create test user
  const salt = bcrypt.genSaltSync()
  const user = await prisma.user.upsert({
    where: {
      email: 'user@test.com',
    },
    update: {},
    create: {
      name: 'test',
      email: 'user@test.com',
      password: bcrypt.hashSync('password', salt),
    },
  })
}

run()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
