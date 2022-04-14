import { IResolvers } from '@graphql-tools/utils';
import PermissionsService from './../../services/permissions.service';

const queryPermissionResolvers: IResolvers = {
    Query: {

        async permission(_, { id }, { db }) {
            return new PermissionsService(_, { id }, { db }).details();
        },
        async permissions(_, variables, context) {
            return new PermissionsService(_, {
                pagination: variables
            }, context).items();
        }

    }
};

export default queryPermissionResolvers;