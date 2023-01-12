import { IDetails } from '@ICommon';
import { IItComplementary, IItEquipment, OutputDeviceTypeEnum, DeviceSignalEnum } from '@interfaces/it';

export interface IItOutputDevice {
    id: string;
    brand: string;
    model?: string;
    type: OutputDeviceTypeEnum;
    signal?: DeviceSignalEnum[];
    complementaries?: IItComplementary[];
    equipment?: IItEquipment;
    details: IDetails;
}