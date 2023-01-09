import { IDetails } from '@ICommon';
import { CoolingTypeEnum } from '@interfaces/it';

export interface IItCooling {
    id: string;
    brand: string;
    model?: string;
    type: CoolingTypeEnum;
    details: IDetails;
}