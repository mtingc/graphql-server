import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS } from '../../../config/constants';
import { findElements } from '../../../lib/db-operations';

const typeItDesktopResolvers: IResolvers = {
    ItDesktop: {
        ram: async ({ ram }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_RAM,
                {
                    id: { $in: ram }
                }
            );

        },
        storage: async ({ storage }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_STORAGE,
                {
                    id: { $in: storage }
                }
            );

        },
        graphic: async ({ graphic }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_GRAPHIC,
                {
                    id: { $in: graphic }
                }
            );

        },
        cooling: async ({ cooling }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_COOLING,
                {
                    id: { $in: cooling }
                }
            );

        }
    }
};

export default typeItDesktopResolvers;