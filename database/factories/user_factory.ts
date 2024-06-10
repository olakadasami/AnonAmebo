import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { MessageFactory } from './message_factory.js'
import Roles from '../../app/enums/roles.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.person.firstName(),
      password: faker.internet.password(),
    }
  })
  .state('admin', (row) => {
    row.roleId = Roles.ADMIN
  })
  .relation('messages', () => MessageFactory)
  .build()
