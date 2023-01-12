import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItCoolingService extends ResolversOperationsService {

    private element = 'enfriador';
    private collection = COLLECTIONS.IT_COOLING;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Cooling list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            coolings: result.items
        };
    }

    // Get a cooling
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            cooling: result.item
        };
    }

    // Create cooling
    async insert() {
        const cooling = this.getVariables().cooling;

        // Check not to be empty
        if (cooling === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                cooling: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(cooling!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                cooling: null
            };
        }
        cooling!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        cooling!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, cooling || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            cooling: result.item
        };
    }

    // Update cooling
    async modify() {
        const id = this.getVariables().id;
        const cooling = this.getVariables().cooling;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                cooling: null
            };
        }

        // Validate an existing element
        if (cooling === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                cooling: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(cooling!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                cooling: null
            };
        }
        cooling!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, cooling || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            cooling: result.item
        };
    }

    // Delete cooling
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

export default ItCoolingService;