import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of Users
   *
   * GET 'profile/users'
   */
  async index({ view }: HttpContext) {
    const users = await User.query().preload('messages')

    return view.render('pages/users/index', { users })
  }

  // /**
  //  * Display form to create a new user
  //  */
  // async create({}: HttpContext) {}

  // /**
  //  * Handle form submission for the create action
  //  */
  // async store({ request }: HttpContext) {}

  /**
   * Show individual user
   *
   * GET 'profile/users/:id'
   */
  async show({ params, view }: HttpContext) {
    const user = await User.findOrFail(params.id)

    return view.render('pages/users/show', { user })
  }

  /**
   * Edit individual User
   */
  // async edit({ params }: HttpContext) {}

  // /**
  //  * Handle form submission for the edit action
  //  */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete User
   *
   * DELETE 'profile/users/:id'
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user?.delete()

    return response.redirect().withQs().back()
  }
}
