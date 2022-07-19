import { IResolvers } from '@graphql-tools/utils';
import PermissionService from '../../../services/rrhh/permission.service';

const mutationRrhhPermissionResolvers: IResolvers = {
    Mutation: {

        addPermission(_, variables, context) {
            return new PermissionService(_, variables, context).insert();
        },
        updatePermission(_, variables, context) {
            return new PermissionService(_, variables, context).modify();
        },
        deletePermission(_, variables, context) {
            return new PermissionService(_, variables, context).delete();
        }

    }
};

export default mutationRrhhPermissionResolvers;