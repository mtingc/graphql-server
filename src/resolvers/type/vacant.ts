import { IResolvers } from '@graphql-tools/utils';
import JobService from '../../services/rrhh/job.service';

const typeVacantResolvers: IResolvers = {
    Vacant: {
        jobId: async ({ jobId }, _, { db }) => {
            const result = await new JobService(
                {},
                { id: jobId },
                { db }
            ).details();
            return result.job;
        }
    },
};

export default typeVacantResolvers;