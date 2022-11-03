import { IDetails } from '../../common/details.interface';

import { IRequisitionProduct } from './product/product.interface';

export interface IPurchaseRequisition {
    id: string;
    product: IRequisitionProduct[];
    userId: string;
    autorization: boolean;
    details: IDetails;
}