import { IAddress, IContact, IDetails } from '@ICommon';

import { ISupplierTaxex } from './taxex.interface';
import { IPurchaseProduct } from '../product/product.interface';

export interface IPurchaseSupplier {
    id: string;
    name: string;
    logo: string;
    infoContact: IContact;
    address: IAddress;
    taxes: ISupplierTaxex;
    deliveryTime: number;
    passed: boolean;
    classification: string;
    productId: IPurchaseProduct[];
    details: IDetails;
}
