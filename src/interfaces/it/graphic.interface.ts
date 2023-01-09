import { IDetails } from '@ICommon';

export interface IItGraphic {
    id: string;
    brand: string;
    model: string;
    capacity: number;
    details: IDetails;
}