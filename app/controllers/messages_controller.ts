import Message from '#models/message'
import User from '#models/user'
import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'

export default class MessagesController {
  /**
   * Return list of all messages associated with the user
   *
   * GET "profile/user.username"
   */
  async index({ auth, view }: HttpContext) {
    if (!auth.user) {
      throw new Exception('Must be authenticated', { code: '401' })
    }
    const messages = await Message.query().where('user_id', auth.user.id)
    return view.render('pages/dashboard', { messages })
  }

  /**
   * Render the form to create a new Message.
   *
   * GET "message/create?u=user.username"
   */
  async create({ view, request }: HttpContext) {
    const { u } = request.qs()
    const user = await User.findByOrFail('username', u)

    return view.render('pages/message/create', { user })
  }

  /**
   * Handle form submission to create a new message
   *
   * POST 'message?userId=user.id'
   *
   */
  async store({ request, response }: HttpContext) {
    const { message } = request.body()
    const { userId } = request.qs()

    const user = await User.findByOrFail('id', userId)
    await Message.create({
      userId: user.id,
      message,
    })

    return response.redirect().withQs().back()
  }

  /**
   * Display a single message by id.
   *
   * GET "/message/:id"
   */
  async show({ params, view }: HttpContext) {
    const { id } = params
    const message = await Message.findOrFail(id)

    return view.render('pages/message/show', { message })
  }

  /**
   * Handle the form submission to delete a specific message by id.
   *
   * DELETE "message/:id"
   */
  async destroy({ params, response }: HttpContext) {
    const { id } = params
    const message = await Message.findOrFail(id)
    await message.delete()

    return response.redirect().back()
  }
}
