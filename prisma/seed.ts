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
          avatar: artist.avatar,
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
      firstName: 'Leslie',
      lastName: 'Thurlow',
      email: 'l@test.com',
      avatar: 'https://avatarfiles.alphacoders.com/245/245850.jpg',
      password: bcrypt.hashSync('pass', salt),
    },
  })

  const songs = await prisma.song.findMany({})
  await Promise.all(
    new Array(10).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist #${i + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
        },
      })
    })
  )
}

run()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
