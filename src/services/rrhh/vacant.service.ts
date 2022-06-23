import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '../../interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import {
    assignDocumentId
} from '../../lib/db-operations';

class VacantService extends ResolversOperationsService {

    private collection = COLLECTIONS.VACANTS;

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

        const result = await this.list(this.collection, 'vacantes', page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            vacants: result.items
        };
    }

    // Get a contact
    async details() {
        const result = await this.get(this.collection, 'vacantes');
        return {
            status: result.status,
            message: result.message,
            vacant: result.item
        };
    }

    // Create contact
    async insert() {
        const vacant = this.getVariables().vacant;
        // Check not to be empty
        if (vacant === null) {
            return {
                status: false,
                message: 'La vacante no se ha especificado correctamente.',
                vacant: null
            };
        }

        // Create the document
        vacant!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'creationDate', order: -1 });
        // Assign the date in ISO format in the date property
        vacant!.creationDate = new Date().toISOString();

        const result = await this.add(this.collection, vacant || {}, 'vacante');
        return {
            status: result.status,
            message: result.message,
            vacant: result.item
        };
    }

}

export default VacantService;