import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS } from '../../../config/constants';
import { findElements } from '../../../lib/db-operations';

const typeItLaptopResolvers: IResolvers = {
    ItLaptop: {
        ram: async ({ ram }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_RAM,
                {
                    $and: [
                        { id: { $ne: ram } }
                    ]
                }
            );

        },
        storage: async ({ storage }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_STORAGE,
                {
                    $and: [
                        { id: { $ne: storage } }
                    ]
                }
            );

        },

    }
};

export default typeItLaptopResolvers;