import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import Roles from '../enums/roles.js'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const isAdmin = ctx.auth.user?.roleId === Roles.ADMIN

    if (!isAdmin) {
      ctx.response.redirect().toRoute('dashboard')
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
