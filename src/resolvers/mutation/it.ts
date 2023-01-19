import { IResolvers } from '@graphql-tools/utils';
// Main data
import ItDeviceService from '../../services/it/device.service';
import ItConsumableService from '../../services/it/consumable.service';
// Supplementary data
import ItStorageService from '../../services/it/storage.service';
import ItRamService from '../../services/it/ram.service';
import ItGraphicService from '../../services/it/graphic.service';
import ItCoolingService from '../../services/it/cooling.service';
import ItComplementaryService from '../../services/it/complementary.service';
// Actions
import ItEquipmentService from '../../services/it/equipment.service';

const mutationItResolvers: IResolvers = {
    Mutation: {

        // Laptop
        addLaptop(_, variables, context) {
            return new ItDeviceService(_, variables, context).insert();
        },
        updateLaptop(_, variables, context) {
            return new ItDeviceService(_, variables, context).modify();
        },

        // Desktop
        addDesktop(_, variables, context) {
            return new ItDeviceService(_, variables, context).insert();
        },
        updateDesktop(_, variables, context) {
            return new ItDeviceService(_, variables, context).modify();
        },

        // Screen
        addScreen(_, variables, context) {
            return new ItDeviceService(_, variables, context).insert();
        },
        updateScreen(_, variables, context) {
            return new ItDeviceService(_, variables, context).modify();
        },

        // Input
        addPeripheral(_, variables, context) {
            return new ItDeviceService(_, variables, context).insert();
        },
        updatePeripheral(_, variables, context) {
            return new ItDeviceService(_, variables, context).modify();
        },

        deleteDevice(_, variables, context) {
            return new ItDeviceService(_, variables, context).delete();
        },

        // Consumable
        addConsumable(_, variables, context) {
            return new ItConsumableService(_, variables, context).insert();
        },
        updateConsumable(_, variables, context) {
            return new ItConsumableService(_, variables, context).modify();
        },
        deleteConsumable(_, variables, context) {
            return new ItConsumableService(_, variables, context).delete();
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
        },

        // Complementary
        addComplementary(_, variables, context) {
            return new ItComplementaryService(_, variables, context).insert();
        },
        updateComplementary(_, variables, context) {
            return new ItComplementaryService(_, variables, context).modify();
        },
        deleteComplementary(_, variables, context) {
            return new ItComplementaryService(_, variables, context).delete();
        },

        // Equipment
        addEquipment(_, variables, context) {
            return new ItEquipmentService(_, variables, context).insert();
        },
        updateEquipment(_, variables, context) {
            return new ItEquipmentService(_, variables, context).modify();
        },
        deleteEquipment(_, variables, context) {
            return new ItEquipmentService(_, variables, context).delete();
        }

    }
};

export default mutationItResolvers;