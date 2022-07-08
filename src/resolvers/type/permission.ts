import { IResolvers } from '@graphql-tools/utils';
import UsersService from '../../services/users.service';

const typePermissionResolvers: IResolvers = {
    Permission: {
        userId: async ({ userId }, _, { db }) => {
            const result = await new UsersService(
                {},
                { id: userId },
                { db }
            ).details();
            return result.user;
        }
    }
};

export default typePermissionResolvers;