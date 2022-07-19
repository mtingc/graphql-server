import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '../../interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import {
    assignDocumentId
} from '../../lib/db-operations';
import { createDetails, modifierDetails } from '../../lib/details';

class PurchaseRequisitionService extends ResolversOperationsService {

    private element = 'requisicion';
    private collection = COLLECTIONS.PURCHASES_REQUISITIONS;

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

        const result = await this.list(this.collection, `${this.element}es`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            requisitions: result.items
        };
    }

    // Get a contact
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            requisition: result.item
        };
    }

    // Create contact
    async insert() {
        const requisition = this.getVariables().requisition;

        // Check not to be empty
        if (requisition === null) {
            return {
                status: false,
                message: `La ${this.element} no se ha especificado correctamente.`,
                requisition: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(requisition!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                requisition: null
            };
        }
        requisition!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        requisition!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });
        requisition!.autorization = false;

        const result = await this.add(this.collection, requisition || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            requisition: result.item
        };
    }

}

export default PurchaseRequisitionService;