import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '../../interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import {
    assignDocumentId
} from '../../lib/db-operations';
import { createDetails, modifierDetails } from '../../lib/details';

class PurchaseSupplierService extends ResolversOperationsService {

    private element = 'proveedor';
    private collection = COLLECTIONS.PURCHASES_SUPPLIERS;

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
            suppliers: result.items
        };
    }

    // Get a contact
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            supplier: result.item
        };
    }

    // Create contact
    async insert() {
        const supplier = this.getVariables().supplier;

        // Check not to be empty
        if (supplier === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                supplier: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(supplier!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                supplier: null
            };
        }
        supplier!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        supplier!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, supplier || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            supplier: result.item
        };
    }

}

export default PurchaseSupplierService;