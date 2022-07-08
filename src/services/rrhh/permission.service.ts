import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '../../interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import {
    assignDocumentId
} from '../../lib/db-operations';
import { libDetails } from '../../lib/details';

class PermissionService extends ResolversOperationsService {

    private element = 'permiso';
    private collection = COLLECTIONS.PERMISSIONS;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Permission list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            permissions: result.items
        };
    }

    // Get a permit
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            permission: result.item
        };
    }

    // Create permission
    async insert() {
        const permission = this.getVariables().permission;
        const details = await libDetails();

        permission!.details = details;

        // Check not to be empty
        if (permission === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                permission: null
            };
        }

        // The user must be assigned a permission
        if (permission?.userId === null ||
            permission?.userId === undefined ||
            permission?.userId === '') {
            return {
                status: false,
                message: `${this.element} sin usuario asigando.`,
                permission: null
            };
        }

        // Create the document
        permission!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, permission || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            permission: result.item
        };
    }

    // Update permission
    async modify() {
        const id = this.getVariables().id;
        const permission = this.getVariables().permission;

        const details = await libDetails();

        permission!.details = details;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                permission: null
            };
        }
        // Validate an existing element
        if (permission === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                permission: null
            };
        }

        // Assignment of the id as a search filter
        const result = await this.update(this.collection, { id }, permission || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            item: result.item
        };
    }

    // Delete permission
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

export default PermissionService;