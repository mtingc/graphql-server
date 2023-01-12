import { IDetails } from '@ICommon';
import { IItComplementary, IItEquipment, InputDeviceTypeEnum, DeviceSignalEnum } from '@interfaces/it';

export interface IItInputDevice {
    id: string;
    brand: string;
    model?: string;
    type: InputDeviceTypeEnum;
    signal?: DeviceSignalEnum[];
    complementaries?: IItComplementary[];
    equipment?: IItEquipment;
    details: IDetails;
}