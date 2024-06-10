import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .minLength(3)
      .maxLength(100)
      .unique(async (db, value) => {
        const user = await db
          .from('users')
          // .whereNot('id', field.meta.userId)
          .where('username', value)
          .first()
        return !user
      }),
    password: vine.string().minLength(8),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string(),
  })
)
