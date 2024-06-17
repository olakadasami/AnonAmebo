import Role from '#models/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Role.fetchOrCreateMany('id', [
      {
        id: 1,
        name: 'User',
      },
      {
        id: 2,
        name: 'Admin',
      },
    ])
  }
}
