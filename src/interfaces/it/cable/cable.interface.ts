import { IDetails } from '@ICommon';
import { IItEquipment, IItCableInOut, CableTypeEnum } from '@interfaces/it';

export interface IItCable {
    id: string;
    type: CableTypeEnum;
    inOut: IItCableInOut[];
    idEquipment?: IItEquipment;
    details: IDetails;
}