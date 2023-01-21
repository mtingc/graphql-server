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
    ItEquipment: {
        user: async ({ user }, _, { db }) => {

            return await findOneElement(
                db,
                COLLECTIONS.USERS,
                {
                    id: user
                }
            );

        },
        idDevices: async ({ idDevices }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_DEVICE,
                {
                    id: { $in: idDevices }
                }
            );

        },
    },
    ItMaintenance: {
        idReportedBy: async ({ idReportedBy }, _, { db }) => {

            return await findOneElement(
                db,
                COLLECTIONS.USERS,
                {
                    id: idReportedBy
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

        },
        idDevices: async ({ idDevices }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.IT_DEVICE,
                {
                    id: { $in: idDevices }
                }
            );

        },
        idAssignedTo: async ({ idAssignedTo }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.USERS,
                {
                    id: { $in: idAssignedTo }
                }
            );

        },
        daysOpen: async ({ status, resolutionDay, details }) => {

            if (status === 'RESOLVED') {

                const { creationDate } = details;
                const creation = new Date(creationDate).getTime();
                const closed = new Date(resolutionDay).getTime();

                const days = (closed - creation) / (1000 * 60 * 60 * 24);
                return Math.ceil(days);

            } else {
                const { creationDate } = details;
                const creation = new Date(creationDate).getTime();
                const closed = new Date().getTime();

                const days = (closed - creation) / (1000 * 60 * 60 * 24);
                return Math.round(days);
            }

        },
    }
};

export default typeItResolvers;