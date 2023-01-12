import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItConsumableService extends ResolversOperationsService {

    private element = 'consumible';
    private collection = COLLECTIONS.IT_CONSUMABLE;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Consumable list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            consumables: result.items
        };
    }

    // Get a consumable
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            consumable: result.item
        };
    }

    // Create consumable
    async insert() {
        const consumable = this.getVariables().consumable;

        // Check not to be empty
        if (consumable === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                consumable: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(consumable!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                consumable: null
            };
        }
        consumable!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        consumable!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, consumable || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            consumable: result.item
        };
    }

    // Update consumable
    async modify() {
        const id = this.getVariables().id;
        const consumable = this.getVariables().consumable;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                consumable: null
            };
        }

        // Validate an existing element
        if (consumable === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                consumable: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(consumable!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                consumable: null
            };
        }
        consumable!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, consumable || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            consumable: result.item
        };
    }

    // Delete consumable
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

export default ItConsumableService;