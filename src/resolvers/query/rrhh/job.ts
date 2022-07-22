import { IResolvers } from '@graphql-tools/utils';
import RrhhJobService from '../../../services/rrhh/job.service';

const queryRrhhJobResolvers: IResolvers = {
    Query: {

        async job(_, { id }, { db }) {
            return new RrhhJobService(_, { id }, { db }).details();
        },
        async jobs(_, variables, context) {
            return new RrhhJobService(_, {
                pagination: variables
            }, context).items();
        }

    }
};

export default queryRrhhJobResolvers;