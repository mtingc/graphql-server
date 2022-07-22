import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '../../interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import {
    assignDocumentId
} from '../../lib/db-operations';
import { createDetails, modifierDetails } from '../../lib/details';

class RrhhJobService extends ResolversOperationsService {

    private element = 'trabajo';
    private collection = COLLECTIONS.RRHH_JOB;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Job list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            jobs: result.items
        };
    }

    // Get a job
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            job: result.item
        };
    }

    // Create job
    async insert() {
        const job = this.getVariables().job;

        // Check not to be empty
        if (job === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                job: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(job!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                job: null
            };
        }
        job!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        job!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, job || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            job: result.item
        };
    }

    // Update job
    async modify() {
        const id = this.getVariables().id;
        const job = this.getVariables().job;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                job: null
            };
        }

        // Validate an existing element
        if (job === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                job: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(job!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                job: null
            };
        }
        job!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, job || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            job: result.item
        };
    }

    // Delete job
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

export default RrhhJobService;