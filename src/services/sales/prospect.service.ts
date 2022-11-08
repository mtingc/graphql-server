import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '../../interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import {
    assignDocumentId
} from '../../lib/db-operations';
import { createDetails, modifierDetails } from '../../lib/details';

class SalesProspectService extends ResolversOperationsService {

    private element = 'prospecto';
    private collection = COLLECTIONS.SALES_PROSPECTS;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Prospect list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            prospects: result.items
        };
    }

    // Get a prospect
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            prospect: result.item
        };
    }

    // Create prospect
    async insert() {
        const prospect = this.getVariables().prospect;

        // Check not to be empty
        if (prospect === null) {
            return {
                status: false,
                message: `Los datos de ${this.element} no se ha especificado correctamente.`,
                contact: null
            };
        }

        // Check attended
        if (prospect?.attended !== undefined) {
            return {
                status: false,
                message: 'No especificar el campo attended',
                contact: null
            };
        }
        // DETAILS
        const creationDetail = await createDetails(prospect!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                customer: null
            };
        }
        prospect!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        prospect!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });
        prospect!.attended = false;

        const result = await this.add(this.collection, prospect || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            prospect: result.item
        };
    }

    // Update prospect
    async modify() {
        const id = this.getVariables().id;
        const prospect = this.getVariables().prospect;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                prospect: null
            };
        }

        // Validate an existing element
        if (prospect === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                prospect: null
            };
        }

        // Check attended
        if (prospect?.attended !== undefined) {
            return {
                status: false,
                message: 'No especificar el campo attended',
                contact: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(prospect!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                customer: null
            };
        }
        prospect!.details = modificationDetails.item;
        // DETAILS
        prospect!.attended = true;

        const result = await this.update(this.collection, { id }, prospect || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            prospect: result.item
        };
    }

    // Delete prospect
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

export default SalesProspectService;