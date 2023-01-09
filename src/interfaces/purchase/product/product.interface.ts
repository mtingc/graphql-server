import { IDetails } from '@ICommon';

import { IProductType } from './type.interface';

export interface IPurchaseProduct {
    id: string;
    name: string;
    description: string;
    type: IProductType;
    brand: string;
    audited: boolean;
    supplierId: string;
    details: IDetails;
}