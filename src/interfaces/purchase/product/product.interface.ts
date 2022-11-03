import { IDetails } from '../../common/details.interface';

import { IProductType } from './type/type.interface';

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