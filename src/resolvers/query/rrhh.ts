import { IResolvers } from '@graphql-tools/utils';
import PermissionService from '../../services/rrhh/permission.service';
import ContactService from '../../services/rrhh/contact.service';
import VacantService from '../../services/rrhh/vacant.service';

const queryRrhhResolvers: IResolvers = {
    Query: {

        async permission(_, { id }, { db }) {
            return new PermissionService(_, { id }, { db }).details();
        },
        async permissions(_, variables, context) {
            return new PermissionService(_, {
                pagination: variables
            }, context).items();
        },
        async contact(_, { id }, { db }) {
            return new ContactService(_, { id }, { db }).details();
        },
        async contacts(_, variables, context) {
            return new ContactService(_, {
                pagination: variables
            }, context).items();
        },
        async vacant(_, { id }, { db }) {
            return new VacantService(_, { id }, { db }).details();
        },
        async vacants(_, variables, context) {
            return new VacantService(_, {
                pagination: variables
            }, context).items();
        }

    }
};

export default queryRrhhResolvers;