import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '../../interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import {
    assignDocumentId
} from '../../lib/db-operations';
import { createDetails, modifierDetails } from '../../lib/details';

class ContactService extends ResolversOperationsService {

    private element = 'contacto';
    private collection = COLLECTIONS.CONTACTS;

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

        // DETAILS
        const creationDetail = await createDetails(contact!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                contact: null
            };
        }
        contact!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        contact!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, contact || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            contact: result.item
        };
    }

}

export default ContactService;