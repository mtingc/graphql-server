import { IResolvers } from '@graphql-tools/utils';
import RrhhWorkAreaService from '../../../services/rrhh/workArea.service';

const typeRrhhVacantResolvers: IResolvers = {
    RrhhVacant: {
        workAreaId: async ({ workAreaId }, _, { db }) => {
            const result = await new RrhhWorkAreaService(
                {},
                { id: workAreaId },
                { db }
            ).details();
            return result.workArea;
        }
    },
};

export default typeRrhhVacantResolvers;