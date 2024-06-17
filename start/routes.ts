/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UsersController = () => import('#controllers/users_controller')
const MessagesController = () => import('#controllers/messages_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LoginController = () => import('#controllers/auth/login_controller')

// Application Home Page
router
  .get('/', ({ view }) => {
    return view.render('pages/home')
  })
  .as('home')

/**
 * Auth Routes
 */
router
  .group(() => {
    // Login
    router.get('/login', [LoginController, 'show']).as('login.show').use(middleware.guest())
    router.post('/login', [LoginController, 'store']).as('login.store').use(middleware.guest())

    // Register
    router
      .get('/register', [RegisterController, 'show'])
      .as('register.show')
      .use(middleware.guest())
    router
      .post('/register', [RegisterController, 'store'])
      .as('register.store')
      .use(middleware.guest())

    // Logout
    router.post('/logout', [LogoutController, 'handle']).as('logout').use(middleware.auth())
  })
  .prefix('/auth')
  .as('auth')

/**
 * User profile, What they see after logging in
 */
router
  .get('/profile/:username', [MessagesController, 'index'])
  .as('dashboard')
  .use(middleware.auth())

/**
 * Message Routes
 */
router
  .group(() => {
    // Create new message Form
    router.get('create', [MessagesController, 'create']).as('create')

    // Create new message post request
    router.post('', [MessagesController, 'store']).as('store').use(middleware.guest())

    // Get one message
    router.get(':id', [MessagesController, 'show']).as('show').use(middleware.auth())

    // Get all message
    router.get('all/:userId', [MessagesController, 'all']).as('all').use(middleware.auth())
  })
  .as('message')
  .prefix('message')

/**
 * Admin Routes
 * Access to User details
 */
router
  .group(() => {
    // Get all users
    router.get('/', [UsersController, 'index']).as('index')

    // Get one user
    router.get('/:id', [UsersController, 'show']).as('show')

    // Delete User
    router.delete('/:id', [UsersController, 'destroy']).as('destroy')
  })
  .prefix('users')
  .as('users')
  .use(middleware.admin())
