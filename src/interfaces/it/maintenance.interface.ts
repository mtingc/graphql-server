import { IDetails } from '@ICommon';
import { IUser } from '@interfaces/rrhh';
import { IItEquipment, IItDevice } from '@interfaces/it';

export interface IItMaintenance {
    id: string;
    idReportedBy: IUser;
    idEquipment: IItEquipment;
    idDevices: IItDevice[];
    description: string;
    idAssignedTo: IUser[];
    status: MaintenanceStatusEnum;
    priority: MaintenancePriorityEnum;
    resolutionDay: string;
    daysOpen: number;
    additionalComments: string[];
    details: IDetails;
}

export enum MaintenancePriorityEnum {
    LOW,
    MEDIUM,
    HIGH,
    URGENT
}

export enum MaintenanceStatusEnum {
    OPEN,
    PENDING,
    RESOLVED
}