import { IResolvers } from '@graphql-tools/utils';
// Main data
import ItDeviceService from '../../services/it/device.service';
import ItComplementService from '../../services/it/complement.service';
import ItConsumableService from '../../services/it/consumable.service';
// Supplementary data
import ItCableService from '../../services/it/cable.service';
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

        // Component
        addComponent(_, variables, context) {
            return new ItComplementService(_, variables, context).insert();
        },
        updateComponent(_, variables, context) {
            return new ItComplementService(_, variables, context).modify();
        },

        // Component
        addCooling(_, variables, context) {
            return new ItComplementService(_, variables, context).insert();
        },
        updateCooling(_, variables, context) {
            return new ItComplementService(_, variables, context).modify();
        },

        deleteComplement(_, variables, context) {
            return new ItComplementService(_, variables, context).delete();
        },

        // Cable
        addCable(_, variables, context) {
            return new ItCableService(_, variables, context).insert();
        },
        updateCable(_, variables, context) {
            return new ItCableService(_, variables, context).modify();
        },
        deleteCable(_, variables, context) {
            return new ItCableService(_, variables, context).delete();
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