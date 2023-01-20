import { IDetails } from '@ICommon';
import { IUser } from '@interfaces/rrhh';
import { IItDevice } from '@interfaces/it';

export interface IItEquipment {
    id: string;
    user: IUser;
    idDevices: IItDevice[];
    details: IDetails;
}