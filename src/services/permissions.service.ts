import ResolversOperationsService from './resolvers-operations.service';
import { IContextData } from './../interfaces/context-data.interface';
import { COLLECTIONS } from './../config/constants';
import {
    assignDocumentId
} from '../lib/db-operations';

class PermissionsService extends ResolversOperationsService {

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
        const result = await this.list(this.collection, 'permisos');
        return {
            status: result.status,
            message: result.message,
            permissions: result.items
        };
    }

    // Get a permit
    async details() {
        const result = await this.get(this.collection);
        return {
            status: result.status,
            message: result.message,
            permission: result.item
        };
    }

    // Create permission
    async insert() {
        const permission = this.getVariables().permission;
        // Check not to be empty
        if(permission === null) {
            return {
                status: false,
                message: 'El permiso no se ha especificado correctamente.',
                permission: null
            };
        }

        // The user must be assigned a permission
        if(permission?.user === null ||
            permission?.user === undefined ||
            permission?.user === '') {
                return {
                    status: false,
                    message: 'Permiso sin usuario asigando.',
                    permission: null
                };
        }

        // Create the document
        permission!.id = await assignDocumentId(this.getDb(), this.collection, {key: 'date', order: -1});
        // Assign the date in ISO format in the date property
        permission!.date = new Date().toISOString();

        const result = await this.add(this.collection, permission || {}, 'permiso');
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

        // Validate an id
        if(!this.checkData(String(id) || '')){
            return {
                status: false,
                message: 'El ID del permiso no se ha especificado correctamente.',
                permission: null
            };
        }
        // Validate an existing element
        if(permission === null){
            return {
                status: false,
                message: 'El permiso no se ha especificado correctamente.',
                permission: null
            };
        }
        
        // Assignment of the id as a search filter
        const result = await this.update(this.collection, { id }, permission || {}, 'permiso');
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
        if(!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: 'El ID del permiso no se ha especificado correctamente.'
            };
        }

        const result = await this.del(this.collection, { id }, 'permiso');
        return { 
            status: result.status,
            message: result.message
        };
    }

    private checkData(value: string) {
        return (value === '' || value === undefined) ? false : true;
    }
    
}

export default PermissionsService;