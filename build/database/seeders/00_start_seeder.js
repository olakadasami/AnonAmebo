import Role from '#models/role';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
export default class extends BaseSeeder {
    async run() {
        await Role.fetchOrCreateMany('id', [
            {
                id: 1,
                name: 'User',
            },
            {
                id: 2,
                name: 'Admin',
            },
        ]);
    }
}
//# sourceMappingURL=00_start_seeder.js.map