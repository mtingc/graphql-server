import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS } from '../../../config/constants';
import { findElements, findOneElement } from '../../../lib/db-operations';

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

        },
        equipment: async ({ equipment }, _, { db }) => {

            return await findOneElement(
                db,
                COLLECTIONS.IT_EQUIPMENT,
                {
                    id: equipment
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

        },
        equipment: async ({ equipment }, _, { db }) => {

            return await findOneElement(
                db,
                COLLECTIONS.IT_EQUIPMENT,
                {
                    id: equipment
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

        },
        equipment: async ({ equipment }, _, { db }) => {

            return await findOneElement(
                db,
                COLLECTIONS.IT_EQUIPMENT,
                {
                    id: equipment
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

        },
        equipment: async ({ equipment }, _, { db }) => {

            return await findOneElement(
                db,
                COLLECTIONS.IT_EQUIPMENT,
                {
                    id: equipment
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

        },
        equipment: async ({ equipment }, _, { db }) => {

            return await findOneElement(
                db,
                COLLECTIONS.IT_EQUIPMENT,
                {
                    id: equipment
                }
            );

        }
    },
    ItComplementary: {
        equipment: async ({ equipment }, _, { db }) => {

            return await findOneElement(
                db,
                COLLECTIONS.IT_EQUIPMENT,
                {
                    id: equipment
                }
            );

        }
    },
    ItEquipment: {
        user: async ({ user }, _, { db }) => {

            return await findOneElement(
                db,
                COLLECTIONS.USERS,
                {
                    id: user
                }
            );

        }
    }
};

export default typeItResolvers;