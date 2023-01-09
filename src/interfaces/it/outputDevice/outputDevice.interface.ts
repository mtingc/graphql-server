import { IDetails } from '@ICommon';
import { IItComplementary, IItEquipment, OutputDeviceTypeEnum } from '@interfaces/it';

export interface IItOutputDevice {
    id: string;
    brand: string;
    model?: string;
    type: OutputDeviceTypeEnum;
    bluetooth?: boolean;
    complementaries?: IItComplementary[];
    equipment?: IItEquipment;
    details: IDetails;
}