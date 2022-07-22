import { IResolvers } from '@graphql-tools/utils';
import RrhhContactService from '../../../services/rrhh/contact.service';

const queryRrhhContactResolvers: IResolvers = {
    Query: {

        async contact(_, { id }, { db }) {
            return new RrhhContactService(_, { id }, { db }).details();
        },
        async contacts(_, variables, context) {
            return new RrhhContactService(_, {
                pagination: variables
            }, context).items();
        },

    }
};

export default queryRrhhContactResolvers;