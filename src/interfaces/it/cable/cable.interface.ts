import { IDetails } from '@ICommon';
import { IItCableInOut, CableTypeEnum } from '@interfaces/it';

export interface IItCable {
    id: string;
    type: CableTypeEnum;
    inOut: IItCableInOut[];
    details: IDetails;
}