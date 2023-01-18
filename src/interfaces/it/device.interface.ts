import { IDetails } from '@interfaces/common';

export interface IItDevice {
    id: string;
    brand: string;
    model: string;
    idCables: string;
    details: IDetails;
}