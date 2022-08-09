import { ICustomerContact } from './contact/contact.interface';

import { IDetails } from '../../details.interface';

export interface ISaleCustomer {
    id: string;
    name: string;
    logo: string;
    infoContact: ICustomerContact;
    details: IDetails;
}