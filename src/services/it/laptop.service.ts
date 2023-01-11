import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItLaptopService extends ResolversOperationsService {

    private element = 'laptop';
    private collection = COLLECTIONS.IT_LAPTOP;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Laptop list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            laptops: result.items
        };
    }

    // Get a laptop
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            laptop: result.item
        };
    }

    // Create laptop
    async insert() {
        const laptop = this.getVariables().laptop;

        // Check not to be empty
        if (laptop === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                laptop: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(laptop!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                laptop: null
            };
        }
        laptop!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        laptop!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, laptop || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            laptop: result.item
        };
    }

    // Update laptop
    async modify() {
        const id = this.getVariables().id;
        const laptop = this.getVariables().laptop;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                laptop: null
            };
        }

        // Validate an existing element
        if (laptop === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                laptop: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(laptop!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                laptop: null
            };
        }
        laptop!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, laptop || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            laptop: result.item
        };
    }

    // Delete laptop
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

export default ItLaptopService;