import User from '#models/user'
import { registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async show({ view }: HttpContext) {
    /**
     * Serve the register page
     */
    return view.render('pages/auth/register')
  }

  async store({ request, auth, response }: HttpContext) {
    /**
     * Step 1: Get credentials from the request body
     */
    const data = await request.validateUsing(registerValidator)

    /**
     * Step 2: Verify credentials
     */
    const user = await User.create(data)

    /**
     * Step 3: Login user
     */
    await auth.use('web').login(user)

    /**
     * Step 4: Send them to a protected route
     */
    response.redirect().toRoute('dashboard', { username: user.username })
  }
}
