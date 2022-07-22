import { IResolvers } from '@graphql-tools/utils';
import RrhhPermissionService from '../../../services/rrhh/permission.service';

const mutationRrhhPermissionResolvers: IResolvers = {
    Mutation: {

        addPermission(_, variables, context) {
            return new RrhhPermissionService(_, variables, context).insert();
        },
        updatePermission(_, variables, context) {
            return new RrhhPermissionService(_, variables, context).modify();
        },
        deletePermission(_, variables, context) {
            return new RrhhPermissionService(_, variables, context).delete();
        }

    }
};

export default mutationRrhhPermissionResolvers;