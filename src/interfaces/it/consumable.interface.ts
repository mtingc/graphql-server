import { IDetails } from '@ICommon';

export interface IItConsumable {
    id: string;
    brand: string;
    description: string;
    details: IDetails;
}