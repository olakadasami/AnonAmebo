import User from '#models/user';
export default class UsersController {
    async index({ view }) {
        const users = await User.query().preload('messages');
        return view.render('pages/users/index', { users });
    }
    async show({ params, view }) {
        const user = await User.findOrFail(params.id);
        return view.render('pages/users/show', { user });
    }
    async destroy({ params, response }) {
        const user = await User.findOrFail(params.id);
        await user?.delete();
        return response.redirect().withQs().back();
    }
}
//# sourceMappingURL=users_controller.js.map