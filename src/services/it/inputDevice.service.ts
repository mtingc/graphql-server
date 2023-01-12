import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItInputDeviceService extends ResolversOperationsService {

    private element = 'dispositivo de entrada';
    private collection = COLLECTIONS.IT_INPUT_DEVICE;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Input device list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            inputDevices: result.items
        };
    }

    // Get a input device
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            inputDevice: result.item
        };
    }

    // Create input device
    async insert() {
        const inputDevice = this.getVariables().inputDevice;

        // Check not to be empty
        if (inputDevice === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                inputDevice: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(inputDevice!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                inputDevice: null
            };
        }
        inputDevice!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        inputDevice!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, inputDevice || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            inputDevice: result.item
        };
    }

    // Update input device
    async modify() {
        const id = this.getVariables().id;
        const inputDevice = this.getVariables().inputDevice;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                inputDevice: null
            };
        }

        // Validate an existing element
        if (inputDevice === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                inputDevice: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(inputDevice!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                inputDevice: null
            };
        }
        inputDevice!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, inputDevice || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            inputDevice: result.item
        };
    }

    // Delete input device
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

export default ItInputDeviceService;