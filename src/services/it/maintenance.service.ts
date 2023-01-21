import ResolversOperationsService from '../resolvers-operations.service';
import { IContextData } from '@interfaces/context-data.interface';
import { COLLECTIONS } from '../../config/constants';
import { assignDocumentId } from '../../lib/db-operations';
import {
    createDetails,
    modifierDetails
} from '../../lib/details';
import { MaintenanceStatusEnum } from '../../interfaces/it';

class ItMaintenanceService extends ResolversOperationsService {

    private element = 'mantenimiento';
    private collection = COLLECTIONS.IT_MAINTENANCE;

    constructor(
        root: object,
        variables: object,
        context: IContextData
    ) {
        super(root, variables, context);
    }

    // Maintenance list
    async items() {
        const page = this.getVariables().pagination?.page;
        const itemsPage = this.getVariables().pagination?.itemsPage;

        const result = await this.list(this.collection, `${this.element}s`, page, itemsPage);
        return {
            info: result.info,
            status: result.status,
            message: result.message,
            maintenances: result.items
        };
    }

    // Get a maintenance
    async details() {
        const result = await this.get(this.collection, this.element);
        return {
            status: result.status,
            message: result.message,
            maintenance: result.item
        };
    }

    // Create maintenance
    async insert() {
        const maintenance = this.getVariables().maintenance;

        // Check not to be empty
        if (maintenance === null) {
            return {
                status: false,
                message: `El ${this.element} no se ha especificado correctamente.`,
                maintenance: null
            };
        }

        if (maintenance?.resolutionDay !== undefined) {
            return {
                status: false,
                message: `La fecha de resolución no es válida en la creación de un mantenimiento.`,
                maintenance: null
            }
        }

        if (maintenance!.status !== 'OPEN' as unknown as MaintenanceStatusEnum) {
            return {
                status: false,
                message: `El estado debe estar abierto en la creación de un mantenimiento.`,
                maintenance: null
            }
        }

        // DETAILS
        const creationDetail = await createDetails(maintenance!.details);
        if (!creationDetail.status) {
            return {
                status: false,
                message: creationDetail.message,
                maintenance: null
            };
        }
        maintenance!.details = creationDetail.item;
        // DETAILS

        // Check the last registered user to assign ID
        maintenance!.id = await assignDocumentId(this.getDb(), this.collection, { key: 'details.creationDate', order: -1 });

        const result = await this.add(this.collection, maintenance || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            maintenance: result.item
        };
    }

    // Update maintenance
    async modify() {
        const id = this.getVariables().id;
        const maintenance = this.getVariables().maintenance;

        // Validate an id
        if (!this.checkData(String(id) || '')) {
            return {
                status: false,
                message: `El ID del ${this.element} no se ha especificado correctamente.`,
                maintenance: null
            };
        }

        // Validate an existing element
        if (maintenance === null) {
            return {
                status: false,
                message: `El ${this.element} no existe.`,
                maintenance: null
            };
        }

        if (maintenance?.status === 'RESOLVED' as unknown as MaintenanceStatusEnum) {
            maintenance!.resolutionDay = new Date().toISOString();
        }

        // DETAILS
        const modificationDetails = await modifierDetails(maintenance!.details);
        if (!modificationDetails.status) {
            return {
                status: false,
                message: modificationDetails.message,
                maintenance: null
            };
        }
        maintenance!.details = modificationDetails.item;
        // DETAILS

        const result = await this.update(this.collection, { id }, maintenance || {}, this.element);
        return {
            status: result.status,
            message: result.message,
            maintenance: result.item
        };
    }

    // Delete maintenance
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

export default ItMaintenanceService;