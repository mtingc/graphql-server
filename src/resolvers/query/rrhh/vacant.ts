import { IResolvers } from '@graphql-tools/utils';
import VacantService from '../../../services/rrhh/vacant.service';

const queryRrhhVacantResolvers: IResolvers = {
    Query: {

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

export default queryRrhhVacantResolvers;