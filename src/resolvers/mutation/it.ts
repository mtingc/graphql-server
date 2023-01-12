import { IResolvers } from '@graphql-tools/utils';
import ItLaptopService from '../../services/it/laptop.service';
import ItDesktopService from '../../services/it/desktop.service';
import ItScreenService from '../../services/it/screen.service';
import ItStorageService from '../../services/it/storage.service';
import ItRamService from '../../services/it/ram.service';
import ItGraphicService from '../../services/it/graphic.service';
import ItCoolingService from '../../services/it/cooling.service';

const mutationItResolvers: IResolvers = {
    Mutation: {

        // Laptop
        addLaptop(_, variables, context) {
            return new ItLaptopService(_, variables, context).insert();
        },
        updateLaptop(_, variables, context) {
            return new ItLaptopService(_, variables, context).modify();
        },
        deleteLaptop(_, variables, context) {
            return new ItLaptopService(_, variables, context).delete();
        },

        // Desktop
        addDesktop(_, variables, context) {
            return new ItDesktopService(_, variables, context).insert();
        },
        updateDesktop(_, variables, context) {
            return new ItDesktopService(_, variables, context).modify();
        },
        deleteDesktop(_, variables, context) {
            return new ItDesktopService(_, variables, context).delete();
        },

        // Screen
        addScreen(_, variables, context) {
            return new ItScreenService(_, variables, context).insert();
        },
        updateScreen(_, variables, context) {
            return new ItScreenService(_, variables, context).modify();
        },
        deleteScreen(_, variables, context) {
            return new ItScreenService(_, variables, context).delete();
        },

        // Storage
        addStorage(_, variables, context) {
            return new ItStorageService(_, variables, context).insert();
        },
        updateStorage(_, variables, context) {
            return new ItStorageService(_, variables, context).modify();
        },
        deleteStorage(_, variables, context) {
            return new ItStorageService(_, variables, context).delete();
        },

        // Ram
        addRam(_, variables, context) {
            return new ItRamService(_, variables, context).insert();
        },
        updateRam(_, variables, context) {
            return new ItRamService(_, variables, context).modify();
        },
        deleteRam(_, variables, context) {
            return new ItRamService(_, variables, context).delete();
        },

        // Graphic
        addGraphic(_, variables, context) {
            return new ItGraphicService(_, variables, context).insert();
        },
        updateGraphic(_, variables, context) {
            return new ItGraphicService(_, variables, context).modify();
        },
        deleteGraphic(_, variables, context) {
            return new ItGraphicService(_, variables, context).delete();
        },

        // Cooling
        addCooling(_, variables, context) {
            return new ItCoolingService(_, variables, context).insert();
        },
        updateCooling(_, variables, context) {
            return new ItCoolingService(_, variables, context).modify();
        },
        deleteCooling(_, variables, context) {
            return new ItCoolingService(_, variables, context).delete();
        }

    }
};

export default mutationItResolvers;