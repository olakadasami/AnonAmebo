import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator } from '#validators/auth'

export default class LoginController {
  async show({ view }: HttpContext) {
    /**
     * Serve the login page
     */
    return view.render('pages/auth/login')
  }

  async store({ request, auth, response, session }: HttpContext) {
    /**
     * Step 1: Get credentials from the request body
     */
    const { username, password } = await request.validateUsing(loginValidator)

    /**
     * Step 2: Verify credentials
     */
    const user = await User.verifyCredentials(username, password)

    /**
     * Step 3: Login user
     */
    await auth.use('web').login(user)

    session.flash('notification', {
      type: 'success',
      message: 'Thanks for contacting. We will get back to you',
    })

    /**
     * Step 4: Send them to a protected route
     */
    response.redirect().toRoute('dashboard', { username: user.username })
  }
}
