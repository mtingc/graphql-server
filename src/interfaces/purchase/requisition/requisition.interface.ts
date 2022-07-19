import { IRequisitionProduct } from './product/product.interface';

import { IDetails } from '../../details.interface';

export interface IPurchaseRequisition {
    id: string;
    product: IRequisitionProduct[];
    userId: string;
    autorization: boolean;
    details: IDetails;
}