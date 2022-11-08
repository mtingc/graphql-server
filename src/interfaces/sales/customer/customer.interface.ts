import { IContact } from '../../common/contact/contact.interface';
import { IDetails } from '../../common/details.interface';

export interface ISalesCustomer {
    id: string;
    name: string;
    logo: string;
    infoContact: IContact;
    details: IDetails;
}