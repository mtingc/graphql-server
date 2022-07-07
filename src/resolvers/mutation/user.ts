import { IResolvers } from '@graphql-tools/utils';
import UsersService from './../../services/users.service';

const mutationUserResolvers: IResolvers = {
    Mutation: {

        async register(_, variables, context) {
            return new UsersService(_, variables, context).register();
        },
        async login(_, { email, password }, context) {
            return new UsersService(_, { user: { email, password } }, context).login();
        },
        async updateUser(_, variables, context) {
            return new UsersService(_, variables, context).modify();
        },
        async deleteUser(_, variables, context) {
            return new UsersService(_, variables, context).delete();
        }

    }
};

export default mutationUserResolvers;