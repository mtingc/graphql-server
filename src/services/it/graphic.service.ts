import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItGraphicService extends ResolversOperationsService {

    private element = 'tarjeta grafica';
    private collection = COLLECTIONS.IT_GRAPHIC;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Graphic list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            graphics: result.items
        };
    }

    // Get a graphic
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            graphic: result.item
        };
    }

    // Create graphic
    async insert() {
        const graphic = this.getVariables().graphic;

        // Check not to be empty
        if (graphic === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                graphic: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(graphic!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                graphic: null
            };
        }
        graphic!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        graphic!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, graphic || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            graphic: result.item
        };
    }

    // Update graphic
    async modify() {
        const id = this.getVariables().id;
        const graphic = this.getVariables().graphic;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                graphic: null
            };
        }

        // Validate an existing element
        if (graphic === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                graphic: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(graphic!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                graphic: null
            };
        }
        graphic!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, graphic || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            graphic: result.item
        };
    }

    // Delete graphic
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

export default ItGraphicService;