import { IDetails } from '@ICommon';
import { IItEquipment, ComplementaryTypeEnum } from '@interfaces/it';

export interface IItComplementary {
    id: string;
    type: ComplementaryTypeEnum;
    description: string;
    equipment?: IItEquipment;
    details: IDetails;
}