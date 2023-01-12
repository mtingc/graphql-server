import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItOutputDeviceService extends ResolversOperationsService {

    private element = 'dispositivo de salida';
    private collection = COLLECTIONS.IT_OUTPUT_DEVICE;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Output device list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            outputDevices: result.items
        };
    }

    // Get a output device
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            outputDevice: result.item
        };
    }

    // Create output device
    async insert() {
        const outputDevice = this.getVariables().outputDevice;

        // Check not to be empty
        if (outputDevice === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                outputDevice: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(outputDevice!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                outputDevice: null
            };
        }
        outputDevice!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        outputDevice!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, outputDevice || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            outputDevice: result.item
        };
    }

    // Update output device
    async modify() {
        const id = this.getVariables().id;
        const outputDevice = this.getVariables().outputDevice;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                outputDevice: null
            };
        }

        // Validate an existing element
        if (outputDevice === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                outputDevice: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(outputDevice!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                outputDevice: null
            };
        }
        outputDevice!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, outputDevice || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            outputDevice: result.item
        };
    }

    // Delete output device
    async delete() {
        const id = this.getVariables().id;

        // Validate ID
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`
            };
        }

        const result = await this.del(this.collection, { id }, this.element);
        return {
            status: result.status,
            message: result.message
        };
    }

    private checkData(value: string) {
        return (value === '' || value === undefined) ? false : true;
    }

}

export default ItOutputDeviceService;