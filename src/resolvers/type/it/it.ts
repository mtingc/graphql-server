import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS } from '../../../config/constants';
import { findElements, findOneElement } from '../../../lib/db-operations';

const typeItResolvers: IResolvers = {
    ItDevice: {
        __resolveType(root: { dedicatedGraphic: boolean, motherboard: string }) {
            if (root.dedicatedGraphic) {
                return 'ItDeviceLaptop';
            }
            if (root.motherboard) {
                return 'ItDeviceDesktop';
            }
        }
    },
    ItDeviceLaptop: {
        idRams: async ({ idRams }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_RAM,
                {
                    id: { $in: idRams }
                }
            );

        },
        idStorages: async ({ idStorages }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_STORAGE,
                {
                    id: { $in: idStorages }
                }
            );

        },
        idCables: async ({ idCables }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_COMPLEMENTARY,
                {
                    id: { $in: idCables }
                }
            );

        },
        idEquipment: async ({ idEquipment }, _, { db }) => {

            return await findOneElement(
                db,
                COLLECTIONS.IT_EQUIPMENT,
                {
                    id: idEquipment
                }
            );

        }

    },
    ItDeviceDesktop: {
        idRams: async ({ idRams }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_RAM,
                {
                    id: { $in: idRams }
                }
            );

        },
        idStorages: async ({ idStorages }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_STORAGE,
                {
                    id: { $in: idStorages }
                }
            );

        },
        idGraphics: async ({ idGraphics }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_GRAPHIC,
                {
                    id: { $in: idGraphics }
                }
            );

        },
        idCoolings: async ({ idCoolings }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_COOLING,
                {
                    id: { $in: idCoolings }
                }
            );

        },
        idCables: async ({ idCables }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_COMPLEMENTARY,
                {
                    id: { $in: idCables }
                }
            );

        },
        idEquipment: async ({ idEquipment }, _, { db }) => {

            return await findOneElement(
                db,
                COLLECTIONS.IT_EQUIPMENT,
                {
                    id: idEquipment
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