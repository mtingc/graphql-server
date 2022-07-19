import { IResolvers } from '@graphql-tools/utils';
import JobService from '../../../services/rrhh/job.service';

const typeRrhhVacantResolvers: IResolvers = {
    RrhhVacant: {
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

export default typeRrhhVacantResolvers;