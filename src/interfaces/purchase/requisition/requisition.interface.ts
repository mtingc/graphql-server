import { IDetails } from '@ICommon';

import { IRequisitionProduct } from './product.interface';

export interface IPurchaseRequisition {
    id: string;
    product: IRequisitionProduct[];
    userId: string;
    autorization: boolean;
    details: IDetails;
}