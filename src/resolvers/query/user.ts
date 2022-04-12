import { IResolvers } from '@graphql-tools/utils';
import UsersService from './../../services/users.service';

const queryUserResolvers: IResolvers = {
    Query: {

        async users(_, __, context) {
            return new UsersService(_, __, context).items();
        },
        async login(_, { email, password }, context) {
            return new UsersService(_, { user: { email, password }}, context).login();
        },
        async me(_, __, { token }) {
            return new UsersService(_, __, { token }).auth();
        }

    }
};

export default queryUserResolvers;