import Roles from '../enums/roles.js';
import { Exception } from '@adonisjs/core/exceptions';
export default class AdminMiddleware {
    async handle(ctx, next) {
        const isAdmin = ctx.auth.user?.roleId === Roles.ADMIN;
        if (!isAdmin) {
            throw new Exception('You are not authorized to perform this action', {
                code: 'E_NOT_AUTHORIZED',
                status: 401,
            });
        }
        const output = await next();
        return output;
    }
}
//# sourceMappingURL=admin_middleware.js.map