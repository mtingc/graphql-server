import { IDetails } from '@ICommon';
import { RamTypeEnum } from '@interfaces/it';

export interface IItRam {
    id: string;
    brand: string;
    model?: string;
    type: RamTypeEnum;
    capacity: number;
    details: IDetails;
}