import { IImage, IContact, IAddress, IDetails } from '@ICommon';

export interface ISalesProspect {
    id: string;
    company: string;
    businessActivity: string;
    logo: IImage;
    contact: IContact;
    address: IAddress;
    message: string;
    attended: boolean;
    matches: string[];
    details: IDetails;
}