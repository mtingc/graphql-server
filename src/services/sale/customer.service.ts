import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '../../interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import {
    assignDocumentId
} from '../../lib/db-operations';
import { createDetails, modifierDetails } from '../../lib/details';

class SaleCustomerService extends ResolversOperationsService {

    private element = 'cliente';
    private collection = COLLECTIONS.SALES_CUSTOMERS;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Customer list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            customers: result.items
        };
    }

    // Get a customer
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            customer: result.item
        };
    }

    // Create customer
    async insert() {
        const customer = this.getVariables().customer;


        // Check not to be empty
        if (customer === null) {
            return {
                status: false,
                message: `Los datos del ${this.element} no se ha especificado correctamente.`,
                customer: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(customer!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                customer: null
            };
        }
        customer!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        customer!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, customer || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            customer: result.item
        };
    }

    // Update customer
    async modify() {
        const id = this.getVariables().id;
        const customer = this.getVariables().customer;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                contact: null
            };
        }

        // Validate an existing element
        if (customer === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                contact: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(customer!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                customer: null
            };
        }
        customer!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, customer || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            customer: result.item
        };
    }

    // Delete customer
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

export default SaleCustomerService;