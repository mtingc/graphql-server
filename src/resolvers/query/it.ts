import { IResolvers } from '@graphql-tools/utils';
// Main data
import ItDeviceService from '../../services/it/device.service';
import ItComplementService from '../../services/it/complement.service';
import ItConsumableService from '../../services/it/consumable.service';
// Supplementary data
import ItComplementaryService from '../../services/it/complementary.service';
// Actions
import ItEquipmentService from '../../services/it/equipment.service';

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

        // Consumable
        async consumable(_, { id }, { db }) {
            return new ItConsumableService(_, { id }, { db }).details();
        },
        async consumables(_, variables, context) {
            return new ItConsumableService(_, {
                pagination: variables
            }, context).items();
        },

        // Complementary
        async complementary(_, { id }, { db }) {
            return new ItComplementaryService(_, { id }, { db }).details();
        },
        async complementaries(_, variables, context) {
            return new ItComplementaryService(_, {
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
        }

    }
};

export default queryItResolvers;