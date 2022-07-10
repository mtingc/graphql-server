import { ISupplierContact } from './contact/contact.interface';
import { ISupplierAddress } from './address/address.interface';
import { ISupplierTaxex } from './taxes/taxex.interface';

import { IDetails } from './../../details.interface';

export interface IPurchaseSupplier {
    id: string;
    name: string;
    logo: string;
    infoContact: ISupplierContact;
    address: ISupplierAddress;
    taxes: ISupplierTaxex;
    deliveryTime: number;
    passed: boolean;
    classification: string;
    details: IDetails;
}
