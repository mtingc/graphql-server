import { IImage } from "../../common/image.interface";
import { IContact } from "../../common/contact/contact.interface";
import { IAddress } from "../../common/address/address.interface";
import { IDetails } from "../../common/details.interface";

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