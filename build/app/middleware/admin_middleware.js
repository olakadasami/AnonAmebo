import Roles from '../enums/roles.js';
export default class AdminMiddleware {
    async handle(ctx, next) {
        const isAdmin = ctx.auth.user?.roleId === Roles.ADMIN;
        if (!isAdmin) {
            ctx.response.redirect().toRoute('dashboard');
        }
        const output = await next();
        return output;
    }
}
//# sourceMappingURL=admin_middleware.js.map