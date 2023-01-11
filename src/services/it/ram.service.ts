import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItRamService extends ResolversOperationsService {

    private element = 'ram';
    private collection = COLLECTIONS.IT_RAM;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Ram list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            rams: result.items
        };
    }

    // Get a ram
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            ram: result.item
        };
    }

    // Create ram
    async insert() {
        const ram = this.getVariables().ram;

        // Check not to be empty
        if (ram === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                ram: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(ram!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                ram: null
            };
        }
        ram!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        ram!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, ram || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            ram: result.item
        };
    }

    // Update ram
    async modify() {
        const id = this.getVariables().id;
        const ram = this.getVariables().ram;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                ram: null
            };
        }

        // Validate an existing element
        if (ram === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                ram: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(ram!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                ram: null
            };
        }
        ram!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, ram || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            ram: result.item
        };
    }

    // Delete ram
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

export default ItRamService;