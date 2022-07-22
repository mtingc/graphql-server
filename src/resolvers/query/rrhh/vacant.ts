import { IResolvers } from '@graphql-tools/utils';
import RrhhVacantService from '../../../services/rrhh/vacant.service';

const queryRrhhVacantResolvers: IResolvers = {
    Query: {

        async vacant(_, { id }, { db }) {
            return new RrhhVacantService(_, { id }, { db }).details();
        },
        async vacants(_, variables, context) {
            return new RrhhVacantService(_, {
                pagination: variables
            }, context).items();
        }

    }
};

export default queryRrhhVacantResolvers;