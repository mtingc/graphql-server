import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItStorageService extends ResolversOperationsService {

    private element = 'almacenamiento';
    private collection = COLLECTIONS.IT_STORAGE;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Storage list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            storages: result.items
        };
    }

    // Get a storage
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            storage: result.item
        };
    }

    // Create storage
    async insert() {
        const storage = this.getVariables().storage;

        // Check not to be empty
        if (storage === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                storage: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(storage!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                storage: null
            };
        }
        storage!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        storage!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, storage || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            storage: result.item
        };
    }

    // Update storage
    async modify() {
        const id = this.getVariables().id;
        const storage = this.getVariables().storage;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                storage: null
            };
        }

        // Validate an existing element
        if (storage === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                storage: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(storage!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                storage: null
            };
        }
        storage!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, storage || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            storage: result.item
        };
    }

    // Delete storage
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

export default ItStorageService;