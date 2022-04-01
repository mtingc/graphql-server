import { IResolvers } from '@graphql-tools/utils';

const queryPermissionResolvers: IResolvers = {
    Query: {

        permissions() {return 'Hola';}

    }
};

export default queryPermissionResolvers;