
import prisma from "~/lib/prisma"
import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import { addSeconds } from "date-fns"

export default defineEventHandler(async (event) => {
  const body = await readBody<Prisma.UserCreateInput>(event)

  if (!body.email || !body.password) {
    return sendError(event, createError({
      statusCode: 422,
      message: 'Invalid data'
    }))
  }


  const res = await prisma.user.findFirst({
    where: {
      email: body.email,
    }
  })

  if (!res) {
    return sendError(event, createError({
      statusCode: 404,
      message: 'User not found'
    }))
  }

  const isValid = await bcrypt.compare(body.password, res?.password)

  if (!isValid) {
    return sendError(event, createError({
      statusCode: 401,
      message: 'Unauthorized'
    }))
  }

  setCookie(event, 'auth', JSON.stringify({ id: res.id }), { httpOnly: true, maxAge: 30 * 60 * 30 })

  return {
    id: res.id
  }
})
