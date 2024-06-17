import factory from '@adonisjs/lucid/factories';
import Message from '#models/message';
import { UserFactory } from './user_factory.js';
export const MessageFactory = factory
    .define(Message, async ({ faker }) => {
    return {
        userId: 1,
        message: faker.lorem.sentence(),
    };
})
    .state('user2', (row) => {
    row.userId = 2;
})
    .relation('user', () => UserFactory)
    .build();
//# sourceMappingURL=message_factory.js.map