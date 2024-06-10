import { BaseSchema } from '@adonisjs/lucid/schema'
import Roles from '../../app/enums/roles.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.integer('role_id').unsigned().references('roles.id').notNullable().defaultTo(Roles.USER)

      table.string('username').notNullable().unique()
      table.string('password').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
