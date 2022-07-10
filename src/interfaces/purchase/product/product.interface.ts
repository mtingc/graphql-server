import { IDetails } from '../../details.interface';

export interface IPurchaseProduct {
    id: string;
    name: string;
    description: string;
    brand: string;
    audited: boolean;
    supplierId: string;
    details: IDetails;
}