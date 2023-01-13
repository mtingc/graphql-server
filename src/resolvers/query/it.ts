import { IResolvers } from '@graphql-tools/utils';
// Main data
import ItLaptopService from '../../services/it/laptop.service';
import ItDesktopService from '../../services/it/desktop.service';
import ItScreenService from '../../services/it/screen.service';
import ItInputDeviceService from '../../services/it/inputDevice.service';
import ItOutputDeviceService from '../../services/it/outputDevice.service';
import ItConsumableService from '../../services/it/consumable.service';
// Supplementary data
import ItStorageService from '../../services/it/storage.service';
import ItRamService from '../../services/it/ram.service';
import ItGraphicService from '../../services/it/graphic.service';
import ItCoolingService from '../../services/it/cooling.service';
import ItComplementaryService from '../../services/it/complementary.service';
// Actions

const queryItResolvers: IResolvers = {
    Query: {

        // Laptop
        async laptop(_, { id }, { db }) {
            return new ItLaptopService(_, { id }, { db }).details();
        },
        async laptops(_, variables, context) {
            return new ItLaptopService(_, {
                pagination: variables
            }, context).items();
        },

        // Desktop
        async desktop(_, { id }, { db }) {
            return new ItDesktopService(_, { id }, { db }).details();
        },
        async desktops(_, variables, context) {
            return new ItDesktopService(_, {
                pagination: variables
            }, context).items();
        },

        // Screen
        async screen(_, { id }, { db }) {
            return new ItScreenService(_, { id }, { db }).details();
        },
        async screens(_, variables, context) {
            return new ItScreenService(_, {
                pagination: variables
            }, context).items();
        },

        // Input device
        async inputDevice(_, { id }, { db }) {
            return new ItInputDeviceService(_, { id }, { db }).details();
        },
        async inputDevices(_, variables, context) {
            return new ItInputDeviceService(_, {
                pagination: variables
            }, context).items();
        },

        // Output device
        async outputDevice(_, { id }, { db }) {
            return new ItOutputDeviceService(_, { id }, { db }).details();
        },
        async outputDevices(_, variables, context) {
            return new ItOutputDeviceService(_, {
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

        // Storage
        async storage(_, { id }, { db }) {
            return new ItStorageService(_, { id }, { db }).details();
        },
        async storages(_, variables, context) {
            return new ItStorageService(_, {
                pagination: variables
            }, context).items();
        },

        // Ram
        async ram(_, { id }, { db }) {
            return new ItRamService(_, { id }, { db }).details();
        },
        async rams(_, variables, context) {
            return new ItRamService(_, {
                pagination: variables
            }, context).items();
        },

        // Graphic
        async graphic(_, { id }, { db }) {
            return new ItGraphicService(_, { id }, { db }).details();
        },
        async graphics(_, variables, context) {
            return new ItGraphicService(_, {
                pagination: variables
            }, context).items();
        },

        // Cooling
        async cooling(_, { id }, { db }) {
            return new ItCoolingService(_, { id }, { db }).details();
        },
        async coolings(_, variables, context) {
            return new ItCoolingService(_, {
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
        }

    }
};

export default queryItResolvers;