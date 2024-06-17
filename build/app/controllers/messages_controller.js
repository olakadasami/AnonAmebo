import Message from '#models/message';
import User from '#models/user';
import { Exception } from '@adonisjs/core/exceptions';
export default class MessagesController {
    async index({ auth, view }) {
        if (!auth.user) {
            throw new Exception('Must be authenticated', { code: '401' });
        }
        const messages = await Message.query()
            .where('user_id', auth.user.id)
            .orderBy('createdAt', 'desc');
        return view.render('pages/dashboard', { messages });
    }
    async all({ auth, view }) {
        if (!auth.user) {
            throw new Exception('Must be authenticated', { code: '401' });
        }
        const messages = await Message.query()
            .where('user_id', auth.user.id)
            .orderBy('createdAt', 'desc');
        return view.render('pages/message/index', { messages });
    }
    async create({ view, request }) {
        const { u } = request.qs();
        const user = await User.findByOrFail('username', u);
        return view.render('pages/message/create', { user });
    }
    async store({ request, response }) {
        const { message } = request.body();
        const { userId } = request.qs();
        const user = await User.findByOrFail('id', userId);
        await Message.create({
            userId: user.id,
            message,
        });
        return response.redirect().withQs().back();
    }
    async show({ params, view }) {
        const { id } = params;
        const message = await Message.findOrFail(id);
        return view.render('pages/message/show', { message });
    }
    async destroy({ params, response }) {
        const { id } = params;
        const message = await Message.findOrFail(id);
        await message.delete();
        return response.redirect().back();
    }
}
//# sourceMappingURL=messages_controller.js.map