import { MessageFactory } from '#database/factories/message_factory'
import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment: ['development']
  async run() {
    // Write your database queries inside the run method
    await UserFactory.createMany(2)
    await UserFactory.apply('admin').createMany(1)
    await MessageFactory.createMany(4)
    await MessageFactory.apply('user2').createMany(4)
    // await MessageFactory.apply('user2').createMany(4)
  }
}
