import { IResolvers } from '@graphql-tools/utils';
import RrhhWorkAreaService from '../../../services/rrhh/workArea.service';

const mutationRrhhWorkAreaResolvers: IResolvers = {
    Mutation: {

        addWorkArea(_, variables, context) {
            return new RrhhWorkAreaService(_, variables, context).insert();
        },
        updateWorkArea(_, variables, context) {
            return new RrhhWorkAreaService(_, variables, context).modify();
        },
        deleteWorkArea(_, variables, context) {
            return new RrhhWorkAreaService(_, variables, context).delete();
        }

    }
};

export default mutationRrhhWorkAreaResolvers;