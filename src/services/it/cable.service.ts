import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItCableService extends ResolversOperationsService {

    private element = 'cable';
    private collection = COLLECTIONS.IT_CABLE;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Cables list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            cables: result.items
        };
    }

    // Get a cable
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            cable: result.item
        };
    }

    // Create cable
    async insert() {
        const cable = this.getVariables().cable;

        // Check not to be empty
        if (cable === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                cable: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(cable!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                cable: null
            };
        }
        cable!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        cable!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, cable || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            cable: result.item
        };
    }

    // Update cable
    async modify() {
        const id = this.getVariables().id;
        const cable = this.getVariables().cable;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                cable: null
            };
        }

        // Validate an existing element
        if (cable === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                cable: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(cable!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                cable: null
            };
        }
        cable!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, cable || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            cable: result.item
        };
    }

    // Delete cable
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

export default ItCableService;