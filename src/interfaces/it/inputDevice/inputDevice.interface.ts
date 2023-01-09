import { IDetails } from '@ICommon';
import { IItComplementary, IItEquipment, InputDeviceTypeEnum } from '@interfaces/it';

export interface IItInputDevice {
    id: string;
    brand: string;
    model?: string;
    type: InputDeviceTypeEnum;
    bluetooth?: boolean;
    complementaries?: IItComplementary[];
    equipment?: IItEquipment;
    details: IDetails;
}