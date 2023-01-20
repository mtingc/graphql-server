import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItComplementService extends ResolversOperationsService {

    private element = 'complemento';
    private collection = COLLECTIONS.IT_COMPLEMENT;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Complements list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            complements: result.items
        };
    }

    // Get a complement
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            complement: result.item
        };
    }

    // Create complement
    async insert() {
        const complement = this.getVariables().complement;

        // Check not to be empty
        if (complement === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                complement: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(complement!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                complement: null
            };
        }
        complement!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        complement!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, complement || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            complement: result.item
        };
    }

    // Update complement
    async modify() {
        const id = this.getVariables().id;
        const complement = this.getVariables().complement;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                complement: null
            };
        }

        // Validate an existing element
        if (complement === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                complement: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(complement!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                complement: null
            };
        }
        complement!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, complement || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            complement: result.item
        };
    }

    // Delete complement
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

export default ItComplementService;