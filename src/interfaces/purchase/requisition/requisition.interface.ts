import { IRequisitionAmountOf } from './amountOf/amountOf.interface';

import { IDetails } from '../../details.interface';

export interface IPurchaseRequisition {
    id: string;
    productId: string[];
    amountOf: IRequisitionAmountOf;
    userId: string;
    autorization: boolean;
    details: IDetails;
}