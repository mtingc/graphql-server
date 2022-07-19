import { IResolvers } from '@graphql-tools/utils';
import PermissionService from '../../../services/rrhh/permission.service';

const queryRrhhPermissionResolvers: IResolvers = {
    Query: {

        async permission(_, { id }, { db }) {
            return new PermissionService(_, { id }, { db }).details();
        },
        async permissions(_, variables, context) {
            return new PermissionService(_, {
                pagination: variables
            }, context).items();
        }

    }
};

export default queryRrhhPermissionResolvers;