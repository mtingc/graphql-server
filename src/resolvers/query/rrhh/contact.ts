import { IResolvers } from '@graphql-tools/utils';
import ContactService from '../../../services/rrhh/contact.service';

const queryRrhhContactResolvers: IResolvers = {
    Query: {

        async contact(_, { id }, { db }) {
            return new ContactService(_, { id }, { db }).details();
        },
        async contacts(_, variables, context) {
            return new ContactService(_, {
                pagination: variables
            }, context).items();
        },

    }
};

export default queryRrhhContactResolvers;