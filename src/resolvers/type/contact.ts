import { IResolvers } from '@graphql-tools/utils';
import VacantService from '../../services/rrhh/vacant.service';
import { IContact } from '../../interfaces/contact.interface';

const typeContactResolvers: IResolvers = {
    Contact: {
        __resolveType: (contact: IContact) => {
            if (contact.age) {
                return 'ContactRrhh';
            }

            return 'ContactSales';
        }
    },
    ContactRrhh: {
        vacantId: async ({ vacantId }, _, { db }) => {
            const result = await new VacantService(
                {},
                { id: vacantId },
                { db }
            ).details();
            return result.vacant;
        }
    }
};

export default typeContactResolvers;