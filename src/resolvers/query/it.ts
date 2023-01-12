import { IResolvers } from '@graphql-tools/utils';
import ItLaptopService from '../../services/it/laptop.service';
import ItDesktopService from '../../services/it/desktop.service';
import ItScreenService from '../../services/it/screen.service';
import ItStorageService from '../../services/it/storage.service';
import ItRamService from '../../services/it/ram.service';
import ItGraphicService from '../../services/it/graphic.service';
import ItCoolingService from '../../services/it/cooling.service';

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
        }

    }
};

export default queryItResolvers;