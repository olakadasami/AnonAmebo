import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';
const UsersController = () => import('#controllers/users_controller');
const MessagesController = () => import('#controllers/messages_controller');
const LogoutController = () => import('#controllers/auth/logout_controller');
const RegisterController = () => import('#controllers/auth/register_controller');
const LoginController = () => import('#controllers/auth/login_controller');
router
    .get('/', ({ view }) => {
    return view.render('pages/home');
})
    .as('home');
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
    .group(() => {
    router.get('create', [MessagesController, 'create']).as('create');
    router.post('', [MessagesController, 'store']).as('store').use(middleware.guest());
    router.get(':id', [MessagesController, 'show']).as('show').use(middleware.auth());
    router.get('all/:userId', [MessagesController, 'all']).as('all').use(middleware.auth());
})
    .as('message')
    .prefix('message');
router
    .group(() => {
    router.get('/', [UsersController, 'index']).as('index');
    router.get('/:id', [UsersController, 'show']).as('show');
    router.delete('/:id', [UsersController, 'destroy']).as('destroy');
})
    .prefix('users')
    .as('users')
    .use(middleware.admin());
//# sourceMappingURL=routes.js.map