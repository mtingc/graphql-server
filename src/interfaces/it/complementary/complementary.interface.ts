import { IDetails } from '@ICommon';
import { IItEquipment, IItComplementaryInOut, ComplementaryTypeEnum } from '@interfaces/it';

export interface IItComplementary {
    id: string;
    type: ComplementaryTypeEnum;
    inOut: IItComplementaryInOut[];
    equipment?: IItEquipment;
    details: IDetails;
}