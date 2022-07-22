import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '../../interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import {
    assignDocumentId
} from '../../lib/db-operations';

class RrhhContactService extends ResolversOperationsService {

    private element = 'contacto';
    private collection = COLLECTIONS.RRHH_CONTACTS;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Contact list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            contacts: result.items
        };
    }

    // Get a contact
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            contact: result.item
        };
    }

    // Create contact
    async insert() {
        const contact = this.getVariables().contact;


        // Check not to be empty
        if (contact === null) {
            return {
                status: false,
                message: 'Los datos de contacto no se ha especificado correctamente.',
                contact: null
            };
        }

        // Check attended
        if (contact?.attended !== undefined) {
            return {
                status: false,
                message: 'No especificar el campo attended',
                contact: null
            };
        }
        // Check creationDate
        if (contact?.creationDate !== undefined) {
            return {
                status: false,
                message: 'No especificar el campo creationDate',
                contact: null
            };
        }

        contact!.creationDate = new Date().toISOString();

        // Check the last registered user to assign ID
        contact!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'creationDate', order: -1 });
        contact!.attended = false;

        const result = await this.add(this.collection, contact || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            contact: result.item
        };
    }

    // Update contact
    async modify() {
        const id = this.getVariables().id;
        const contact = this.getVariables().contact;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                contact: null
            };
        }

        // Validate an existing element
        if (contact === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                contact: null
            };
        }

        const result = await this.update(this.collection, { id }, contact || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            contact: result.item
        };
    }

    // Delete contact
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

export default RrhhContactService;