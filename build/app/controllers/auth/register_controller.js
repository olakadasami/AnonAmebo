import User from '#models/user';
import { registerValidator } from '#validators/auth';
export default class RegisterController {
    async show({ view }) {
        return view.render('pages/auth/register');
    }
    async store({ request, auth, response }) {
        const data = await request.validateUsing(registerValidator);
        const user = await User.create(data);
        await auth.use('web').login(user);
        response.redirect().toRoute('dashboard', { username: user.username });
    }
}
//# sourceMappingURL=register_controller.js.map