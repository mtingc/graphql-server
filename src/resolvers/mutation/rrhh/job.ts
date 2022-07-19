import { IResolvers } from '@graphql-tools/utils';
import JobService from '../../../services/rrhh/job.service';

const mutationRrhhJobResolvers: IResolvers = {
    Mutation: {

        addJob(_, variables, context) {
            return new JobService(_, variables, context).insert();
        }

    }
};

export default mutationRrhhJobResolvers;