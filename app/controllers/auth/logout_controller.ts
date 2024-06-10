import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async handle({ auth, response }: HttpContext) {
    /**
     * Step 1: Logout user using auth
     */
    await auth.use('web').logout()
    /**
     * Step 2: Redirect to login page
     */
    return response.redirect().toRoute('auth.login.show')
  }
}
