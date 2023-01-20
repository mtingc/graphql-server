import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS } from '../../../config/constants';
import { findElements, findOneElement } from '../../../lib/db-operations';
import { IItScreenInput, ItPeripheralTypeEnum } from '@interfaces/it';

const typeItResolvers: IResolvers = {
    ItDevice: {
        __resolveType(root: { dedicatedGraphic: boolean, motherboard: string, inputs: IItScreenInput, type: ItPeripheralTypeEnum }) {
            if (root.dedicatedGraphic) {
                return 'ItDeviceLaptop';
            }
            if (root.motherboard) {
                return 'ItDeviceDesktop';
            }
            if (root.inputs) {
                return 'ItDeviceScreen';
            }
            if (root.type) {
                return 'ItDevicePeripheral';
            }
        }
    },
    ItDeviceLaptop: {
        idRams: async ({ idRams }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_COMPLEMENT,
                {
                    id: { $in: idRams }
                }
            );

        },
        idStorages: async ({ idStorages }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_COMPLEMENT,
                {
                    id: { $in: idStorages }
                }
            );

        },
        idCables: async ({ idCables }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_CABLE,
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
                COLLECTIONS.IT_COMPLEMENT,
                {
                    id: { $in: idRams }
                }
            );

        },
        idStorages: async ({ idStorages }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_COMPLEMENT,
                {
                    id: { $in: idStorages }
                }
            );

        },
        idGraphics: async ({ idGraphics }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_COMPLEMENT,
                {
                    id: { $in: idGraphics }
                }
            );

        },
        idCoolings: async ({ idCoolings }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_COMPLEMENT,
                {
                    id: { $in: idCoolings }
                }
            );

        },
        idCables: async ({ idCables }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_CABLE,
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
    ItDeviceScreen: {
        idCables: async ({ idCables }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_CABLE,
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
    ItDevicePeripheral: {
        idCables: async ({ idCables }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_CABLE,
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
    ItComplement: {
        __resolveType(root: { capacity: number, type: any }) {
            if (root.capacity) {
                return 'ItComplementComponent';
            }
            if (root.type) {
                return 'ItComplementCooling';
            }
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