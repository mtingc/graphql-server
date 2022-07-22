import { IResolvers } from '@graphql-tools/utils';
import RrhhJobService from '../../../services/rrhh/job.service';

const mutationRrhhJobResolvers: IResolvers = {
    Mutation: {

        addJob(_, variables, context) {
            return new RrhhJobService(_, variables, context).insert();
        },
        updateJob(_, variables, context) {
            return new RrhhJobService(_, variables, context).modify();
        },
        deleteJob(_, variables, context) {
            return new RrhhJobService(_, variables, context).delete();
        }

    }
};

export default mutationRrhhJobResolvers;