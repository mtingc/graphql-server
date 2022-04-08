import { IResolvers } from '@graphql-tools/utils';
import PermissionsService from './../../services/permissions.service';

const mutationPermissionResolvers: IResolvers = {
    Mutation: {

        addPermission(_, variables, context) {
            return new PermissionsService(_, variables, context).insert();
        },
        updatePermission(_, variables, context) {
            return new PermissionsService(_, variables, context).modify();
        },
        deletePermission(_, variables, context) {
            return new PermissionsService(_, variables, context).delete();
        }

    }
};

export default mutationPermissionResolvers;