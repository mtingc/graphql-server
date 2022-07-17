import { IResolvers } from '@graphql-tools/utils';
import UsersService from '../../services/users.service';

const typeDetailsResolvers: IResolvers = {
    Details: {
        creatorUser: async ({ creatorUserId }, _, { db }) => {
            const result = await new UsersService(
                {},
                { id: creatorUserId },
                { db }
            ).details();
            return result.user;
        },
        modifierUserId: async ({ modifierUserId }, _, { db }) => {
            const result = await new UsersService(
                {},
                { id: modifierUserId },
                { db }
            ).details();
            return result.user;
        }
    }
};

export default typeDetailsResolvers;