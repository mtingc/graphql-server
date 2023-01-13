import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItComplementaryService extends ResolversOperationsService {

    private element = 'complementario';
    private collection = COLLECTIONS.IT_COMPLEMENTARY;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Complementaries list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            complementaries: result.items
        };
    }

    // Get a complementary
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            complementary: result.item
        };
    }

    // Create complementary
    async insert() {
        const complementary = this.getVariables().complementary;

        // Check not to be empty
        if (complementary === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                complementary: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(complementary!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                complementary: null
            };
        }
        complementary!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        complementary!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, complementary || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            complementary: result.item
        };
    }

    // Update complementary
    async modify() {
        const id = this.getVariables().id;
        const complementary = this.getVariables().complementary;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                complementary: null
            };
        }

        // Validate an existing element
        if (complementary === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                complementary: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(complementary!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                complementary: null
            };
        }
        complementary!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, complementary || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            complementary: result.item
        };
    }

    // Delete complementary
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

export default ItComplementaryService;