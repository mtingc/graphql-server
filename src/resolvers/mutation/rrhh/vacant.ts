import { IResolvers } from '@graphql-tools/utils';
import RrhhVacantService from '../../../services/rrhh/vacant.service';

const mutationRrhhVacantResolvers: IResolvers = {
    Mutation: {

        addVacant(_, variables, context) {
            return new RrhhVacantService(_, variables, context).insert();
        },
        updateVacant(_, variables, context) {
            return new RrhhVacantService(_, variables, context).modify();
        },
        deleteVacant(_, variables, context) {
            return new RrhhVacantService(_, variables, context).delete();
        }

    }
};

export default mutationRrhhVacantResolvers;