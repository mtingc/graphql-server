import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItScreenService extends ResolversOperationsService {

    private element = 'pantalla';
    private collection = COLLECTIONS.IT_SCREEN;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Product list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            screens: result.items
        };
    }

    // Get a product
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            screen: result.item
        };
    }

    // Create screen
    async insert() {
        const screen = this.getVariables().screen;

        // Check not to be empty
        if (screen === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                screen: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(screen!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                screen: null
            };
        }
        screen!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        screen!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, screen || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            screen: result.item
        };
    }

    // Update screen
    async modify() {
        const id = this.getVariables().id;
        const screen = this.getVariables().screen;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                screen: null
            };
        }

        // Validate an existing element
        if (screen === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                screen: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(screen!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                screen: null
            };
        }
        screen!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, screen || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            screen: result.item
        };
    }

    // Delete screen
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

export default ItScreenService;