import { IContact, IDetails } from '@ICommon';

export interface ISalesCustomer {
    id: string;
    name: string;
    logo: string;
    infoContact: IContact;
    details: IDetails;
}