import { IDetails } from '@ICommon';
import { IItEquipment, MaintenanceStatusEnum, MaintenancePriorityEnum } from '@interfaces/it';
import { IUser } from '@interfaces/rrhh';

export interface IItMaintenance {
    id: string;
    reportedBy: IUser;
    equipment: IItEquipment;
    devices: string[];
    description: string;
    assignedTo: IUser[];
    status: MaintenanceStatusEnum;
    priority: MaintenancePriorityEnum;
    resolutionDay: string;
    daysOpen: number;
    additionalComments: string;
    details: IDetails;
}