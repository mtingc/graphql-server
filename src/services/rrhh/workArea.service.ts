import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '../../interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import {
    assignDocumentId
} from '../../lib/db-operations';
import { createDetails, modifierDetails } from '../../lib/details';

class RrhhWorkAreaService extends ResolversOperationsService {

    private element = 'area de trabajo';
    private collection = COLLECTIONS.RRHH_WORKAREAS;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Work area list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            workAreas: result.items
        };
    }

    // Get a work area
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            workArea: result.item
        };
    }

    // Create work area
    async insert() {
        const workArea = this.getVariables().workArea;

        // Check not to be empty
        if (workArea === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                workArea: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(workArea!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                workArea: null
            };
        }
        workArea!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        workArea!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, workArea || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            workArea: result.item
        };
    }

    // Update work area
    async modify() {
        const id = this.getVariables().id;
        const workArea = this.getVariables().workArea;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                workArea: null
            };
        }

        // Validate an existing element
        if (workArea === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                workArea: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(workArea!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                workArea: null
            };
        }
        workArea!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, workArea || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            workArea: result.item
        };
    }

    // Delete work area
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

export default RrhhWorkAreaService;