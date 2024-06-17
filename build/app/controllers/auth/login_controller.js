import User from '#models/user';
import { loginValidator } from '#validators/auth';
export default class LoginController {
    async show({ view }) {
        return view.render('pages/auth/login');
    }
    async store({ request, auth, response, session }) {
        const { username, password } = await request.validateUsing(loginValidator);
        const user = await User.verifyCredentials(username, password);
        await auth.use('web').login(user);
        session.flash('notification', {
            type: 'success',
            message: 'Thanks for contacting. We will get back to you',
        });
        response.redirect().toRoute('dashboard', { username: user.username });
    }
}
//# sourceMappingURL=login_controller.js.map