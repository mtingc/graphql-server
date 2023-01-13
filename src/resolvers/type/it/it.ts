import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS } from '../../../config/constants';
import { findElements } from '../../../lib/db-operations';

const typeItResolvers: IResolvers = {
    ItLaptop: {
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
        complementaries: async ({ complementaries }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_COMPLEMENTARY,
                {
                    id: { $in: complementaries }
                }
            );

        }

    },
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

        },
        complementaries: async ({ complementaries }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_COMPLEMENTARY,
                {
                    id: { $in: complementaries }
                }
            );

        }
    },
    ItScreen: {
        complementaries: async ({ complementaries }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_COMPLEMENTARY,
                {
                    id: { $in: complementaries }
                }
            );

        }
    },
    ItInputDevice: {
        complementaries: async ({ complementaries }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_COMPLEMENTARY,
                {
                    id: { $in: complementaries }
                }
            );

        }
    },
    ItOutputDevice: {
        complementaries: async ({ complementaries }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_COMPLEMENTARY,
                {
                    id: { $in: complementaries }
                }
            );

        }
    }
};

export default typeItResolvers;