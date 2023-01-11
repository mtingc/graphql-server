import { IResolvers } from '@graphql-tools/utils';
import ItScreenService from '../../../services/it/screen.service';

const queryItResolvers: IResolvers = {
    Query: {

        async screen(_, { id }, { db }) {
            return new ItScreenService(_, { id }, { db }).details();
        },
        async screens(_, variables, context) {
            return new ItScreenService(_, {
                pagination: variables
            }, context).items();
        },

    }
};

export default queryItResolvers;