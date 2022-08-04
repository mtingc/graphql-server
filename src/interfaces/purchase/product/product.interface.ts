import { IProductType } from './type/type.interface';

import { IDetails } from '../../details.interface';

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