
import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')


  if (!id) {
    return sendError(event, createError({
      statusCode: 422,
      message: 'Please provide an id'
    }))
  }


  const res = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: {
      posts: true
    }
  })

  return res
})
