export default class LogoutController {
    async handle({ auth, response }) {
        await auth.use('web').logout();
        return response.redirect().toRoute('auth.login.show');
    }
}
//# sourceMappingURL=logout_controller.js.map