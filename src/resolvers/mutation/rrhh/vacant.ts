import { IResolvers } from '@graphql-tools/utils';
import VacantService from '../../../services/rrhh/vacant.service';

const mutationRrhhVacantResolvers: IResolvers = {
    Mutation: {

        addVacant(_, variables, context) {
            return new VacantService(_, variables, context).insert();
        }

    }
};

export default mutationRrhhVacantResolvers;