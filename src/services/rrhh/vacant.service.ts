import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '../../interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import {
    assignDocumentId
} from '../../lib/db-operations';
import { createDetails, modifierDetails } from '../../lib/details';

class VacantService extends ResolversOperationsService {

    private element = 'vacante';
    private collection = COLLECTIONS.RRHH_VACANTS;

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
            vacants: result.items
        };
    }

    // Get a contact
    async details() {
        const result = await this.get(this.collection, this.element);
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
                message: `La ${this.element} no se ha especificado correctamente.`,
                vacant: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(vacant!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                vacant: null
            };
        }
        vacant!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        vacant!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });
        vacant!.available = false;

        const result = await this.add(this.collection, vacant || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            vacant: result.item
        };
    }

}

export default VacantService;