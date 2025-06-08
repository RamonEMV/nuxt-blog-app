export default defineEventHandler(async (event) => {

  const cookie = getCookie(event, 'auth')
  if (!cookie) {
    return sendError(event, createError({
      statusCode: 401,
      message: 'Not logged'
    }))

  }

  const obj = JSON.parse(cookie)

  return {
    id: obj.id
  }
})

