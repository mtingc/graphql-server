import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '../../interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import {
    assignDocumentId
} from '../../lib/db-operations';
import { createDetails, editDetails } from '../../lib/details';

class PurchaseProductService extends ResolversOperationsService {

    private element = 'producto';
    private collection = COLLECTIONS.PURCHASES_PRODUCTS;

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
            products: result.items
        };
    }

    // Get a contact
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            product: result.item
        };
    }

    // Create contact
    async insert() {
        const product = this.getVariables().product;

        // Check not to be empty
        if (product === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                product: null
            };
        }

        // Create the document
        const idD = '1';
        const details = await createDetails(idD);

        product!.details = details;

        product!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, product || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            product: result.item
        };
    }

}

export default PurchaseProductService;