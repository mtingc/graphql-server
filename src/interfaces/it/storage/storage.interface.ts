import { IDetails } from '@ICommon';
import { StorageTypeEnum } from '@interfaces/it';

export interface IItStorage {
    id: string;
    brand: string;
    model?: string;
    type: StorageTypeEnum;
    capacity: number;
    details: IDetails;
}