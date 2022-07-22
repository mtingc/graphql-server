import { IResolvers } from '@graphql-tools/utils';
import RrhhVacantService from '../../../services/rrhh/vacant.service';
import { IRrhhContact } from '../../../interfaces/rrhh/contact.interface';

const typeRrhhContactResolvers: IResolvers = {
    RrhhContact: {
        __resolveType: (contact: IRrhhContact) => {
            if (contact.age) {
                return 'RrhhContactRrhh';
            }

            return 'RrhhContactSales';
        }
    },
    RrhhContactRrhh: {
        vacantId: async ({ vacantId }, _, { db }) => {
            const result = await new RrhhVacantService(
                {},
                { id: vacantId },
                { db }
            ).details();
            return result.vacant;
        }
    }
};

export default typeRrhhContactResolvers;