import { IResolvers } from '@graphql-tools/utils';
import ItLaptopService from '../../services/it/laptop.service';
import ItScreenService from '../../services/it/screen.service';
import ItStorageService from '../../services/it/storage.service';
import ItRamService from '../../services/it/ram.service';

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
        }

    }
};

export default queryItResolvers;