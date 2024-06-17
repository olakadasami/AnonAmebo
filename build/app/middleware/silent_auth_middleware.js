export default class SilentAuthMiddleware {
    async handle(ctx, next) {
        await ctx.auth.check();
        const output = await next();
        return output;
    }
}
//# sourceMappingURL=silent_auth_middleware.js.map