import { IDetails } from '@ICommon';
import { IUser } from '@interfaces/rrhh';

export interface IItEquipment {
    id: string;
    user: IUser;
    devices: string[];
    details: IDetails;
}