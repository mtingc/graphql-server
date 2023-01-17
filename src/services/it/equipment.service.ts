import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';

class ItEquipmentService extends ResolversOperationsService {

    private element = 'equipo';
    private collection = COLLECTIONS.IT_EQUIPMENT;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Equipment list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            equipments: result.items
        };
    }

    // Get a equipment
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            equipment: result.item
        };
    }

    // Create equipment
    async insert() {
        const equipment = this.getVariables().equipment;

        // Check not to be empty
        if (equipment === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                equipment: null
            };
        }

        // DETAILS
        const creationDetail = await createDetails(equipment!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                equipment: null
            };
        }
        equipment!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        equipment!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, equipment || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            equipment: result.item
        };
    }

    // Update equipment
    async modify() {
        const id = this.getVariables().id;
        const equipment = this.getVariables().equipment;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                equipment: null
            };
        }

        // Validate an existing element
        if (equipment === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                equipment: null
            };
        }

        // DETAILS
        const modificationDetails = await modifierDetails(equipment!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                equipment: null
            };
        }
        equipment!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, equipment || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            equipment: result.item
        };
    }

    // Delete equipment
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

export default ItEquipmentService;