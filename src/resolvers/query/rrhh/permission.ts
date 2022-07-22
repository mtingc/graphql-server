import { IResolvers } from '@graphql-tools/utils';
import RrhhPermissionService from '../../../services/rrhh/permission.service';

const queryRrhhPermissionResolvers: IResolvers = {
    Query: {

        async permission(_, { id }, { db }) {
            return new RrhhPermissionService(_, { id }, { db }).details();
        },
        async permissions(_, variables, context) {
            return new RrhhPermissionService(_, {
                pagination: variables
            }, context).items();
        }

    }
};

export default queryRrhhPermissionResolvers;