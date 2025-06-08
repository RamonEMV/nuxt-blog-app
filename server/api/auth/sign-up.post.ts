import prisma from "~/lib/prisma"
import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody<Prisma.UserCreateInput>(event)

  if (!body.email || !body.password) {
    return sendError(event, createError({
      statusCode: 422,
      message: 'Invalid data'
    }))
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  const res = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: passwordHash

    }
  })

  return res
})
