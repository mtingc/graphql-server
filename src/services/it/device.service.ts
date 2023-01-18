import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItDeviceService extends ResolversOperationsService {

    private element = 'dispositivo';
    private collection = COLLECTIONS.IT_DEVICE;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Devices list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            devices: result.items
        };
    }

    // Get a device
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            device: result.item
        };
    }

    // Create device
    async insert() {
        const device = this.getVariables().device;

        // Check not to be empty
        if (device === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                device: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(device!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                device: null
            };
        }
        device!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        device!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, device || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            device: result.item
        };
    }

    // Update device
    async modify() {
        const id = this.getVariables().id;
        const device = this.getVariables().device;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                device: null
            };
        }

        // Validate an existing element
        if (device === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                device: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(device!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                device: null
            };
        }
        device!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, device || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            device: result.item
        };
    }

    // Delete device
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

export default ItDeviceService;