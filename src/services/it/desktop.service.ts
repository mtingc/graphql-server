import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItDesktopService extends ResolversOperationsService {

    private element = 'desktop';
    private collection = COLLECTIONS.IT_DESKTOP;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Desktop list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            desktops: result.items
        };
    }

    // Get a desktop
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            desktop: result.item
        };
    }

    // Create desktop
    async insert() {
        const desktop = this.getVariables().desktop;

        // Check not to be empty
        if (desktop === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                desktop: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(desktop!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                desktop: null
            };
        }
        desktop!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        desktop!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, desktop || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            desktop: result.item
        };
    }

    // Update desktop
    async modify() {
        const id = this.getVariables().id;
        const desktop = this.getVariables().desktop;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                desktop: null
            };
        }

        // Validate an existing element
        if (desktop === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                desktop: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(desktop!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                desktop: null
            };
        }
        desktop!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, desktop || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            desktop: result.item
        };
    }

    // Delete desktop
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

export default ItDesktopService;