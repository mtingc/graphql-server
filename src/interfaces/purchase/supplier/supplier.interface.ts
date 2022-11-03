import { IAddress } from '../../common/address/address.interface';
import { IContact } from '../../common/contact/contact.interface';
import { IDetails } from './../../common/details.interface';

import { ISupplierTaxex } from './taxes/taxex.interface';
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
