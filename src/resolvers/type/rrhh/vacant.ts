import { IResolvers } from '@graphql-tools/utils';
import RrhhJobService from '../../../services/rrhh/job.service';

const typeRrhhVacantResolvers: IResolvers = {
    RrhhVacant: {
        jobId: async ({ jobId }, _, { db }) => {
            const result = await new RrhhJobService(
                {},
                { id: jobId },
                { db }
            ).details();
            return result.job;
        }
    },
};

export default typeRrhhVacantResolvers;