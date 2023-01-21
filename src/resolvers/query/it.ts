import { IResolvers } from '@graphql-tools/utils';
// Main data
import ItDeviceService from '../../services/it/device.service';
import ItConsumableService from '../../services/it/consumable.service';
// Supplementary data
import ItComplementService from '../../services/it/complement.service';
import ItCableService from '../../services/it/cable.service';
// Actions
import ItEquipmentService from '../../services/it/equipment.service';
import ItMaintenanceService from '../../services/it/maintenance.service';

const queryItResolvers: IResolvers = {
    Query: {

        // Device
        async device(_, { id }, { db }) {
            return new ItDeviceService(_, { id }, { db }).details();
        },
        async devices(_, variables, context) {
            return new ItDeviceService(_, {
                pagination: variables
            }, context).items();
        },

        // Complement
        async complement(_, { id }, { db }) {
            return new ItComplementService(_, { id }, { db }).details();
        },
        async complements(_, variables, context) {
            return new ItComplementService(_, {
                pagination: variables
            }, context).items();
        },

        // Cable
        async cable(_, { id }, { db }) {
            return new ItCableService(_, { id }, { db }).details();
        },
        async cables(_, variables, context) {
            return new ItCableService(_, {
                pagination: variables
            }, context).items();
        },

        // Consumable
        async consumable(_, { id }, { db }) {
            return new ItConsumableService(_, { id }, { db }).details();
        },
        async consumables(_, variables, context) {
            return new ItConsumableService(_, {
                pagination: variables
            }, context).items();
        },

        // Equipment
        async equipment(_, { id }, { db }) {
            return new ItEquipmentService(_, { id }, { db }).details();
        },
        async equipments(_, variables, context) {
            return new ItEquipmentService(_, {
                pagination: variables
            }, context).items();
        },

        // Equipment
        async maintenance(_, { id }, { db }) {
            return new ItMaintenanceService(_, { id }, { db }).details();
        },
        async maintenances(_, variables, context) {
            return new ItMaintenanceService(_, {
                pagination: variables
            }, context).items();
        }

    }
};

export default queryItResolvers;