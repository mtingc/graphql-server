import { IAddress } from '../../address/address.interface';
import { ISupplierContact } from './contact/contact.interface';
import { ISupplierTaxex } from './taxes/taxex.interface';

import { IPurchaseProduct } from '../product/product.interface';
import { IDetails } from './../../details.interface';

export interface IPurchaseSupplier {
    id: string;
    name: string;
    logo: string;
    infoContact: ISupplierContact;
    address: IAddress;
    taxes: ISupplierTaxex;
    deliveryTime: number;
    passed: boolean;
    classification: string;
    productId: IPurchaseProduct[];
    details: IDetails;
}
