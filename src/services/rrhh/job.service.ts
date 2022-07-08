import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '../../interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import {
    assignDocumentId
} from '../../lib/db-operations';
import { createDetails, editDetails } from '../../lib/details';

class JobService extends ResolversOperationsService {

    private element = 'trabajo';
    private collection = COLLECTIONS.JOB;

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
            jobs: result.items
        };
    }

    // Get a contact
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            job: result.item
        };
    }

    // Create contact
    async insert() {
        const job = this.getVariables().job;

        const idD = '1';
        const details = await createDetails(idD);

        job!.details = details;

        // Check not to be empty
        if (job === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                job: null
            };
        }

        // Create the document
        job!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, job || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            job: result.item
        };
    }

}

export default JobService;