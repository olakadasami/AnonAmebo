import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';
const MessagesController = () => import('#controllers/messages_controller');
const LogoutController = () => import('#controllers/auth/logout_controller');
const RegisterController = () => import('#controllers/auth/register_controller');
const LoginController = () => import('#controllers/auth/login_controller');
router.on('/').render('pages/home').use(middleware.guest());
router
    .group(() => {
    router.get('/login', [LoginController, 'show']).as('login.show').use(middleware.guest());
    router.post('/login', [LoginController, 'store']).as('login.store').use(middleware.guest());
    router
        .get('/register', [RegisterController, 'show'])
        .as('register.show')
        .use(middleware.guest());
    router
        .post('/register', [RegisterController, 'store'])
        .as('register.store')
        .use(middleware.guest());
    router.post('/logout', [LogoutController, 'handle']).as('logout').use(middleware.auth());
})
    .prefix('/auth')
    .as('auth');
router
    .get('/profile/:username', [MessagesController, 'index'])
    .as('dashboard')
    .use(middleware.auth());
router
    .get('/message/create', [MessagesController, 'create'])
    .as('message.create')
    .use(middleware.guest());
router.post('/message', [MessagesController, 'store']).as('message.store').use(middleware.guest());
router.get('/message/:id', [MessagesController, 'show']).as('message.show').use(middleware.auth());
router
    .group(() => {
    router
        .get('/', (ctx) => {
        return `Youre here ${ctx.auth.user?.username} with role ${ctx.auth.user?.roleId}`;
    })
        .as('index');
})
    .prefix('admin')
    .as('admin')
    .use(middleware.admin());
//# sourceMappingURL=routes.js.map