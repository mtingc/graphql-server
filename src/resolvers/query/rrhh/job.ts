import { IResolvers } from '@graphql-tools/utils';
import JobService from '../../../services/rrhh/job.service';

const queryRrhhJobResolvers: IResolvers = {
    Query: {

        async job(_, { id }, { db }) {
            return new JobService(_, { id }, { db }).details();
        },
        async jobs(_, variables, context) {
            return new JobService(_, {
                pagination: variables
            }, context).items();
        }

    }
};

export default queryRrhhJobResolvers;