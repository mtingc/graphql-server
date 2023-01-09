import { IAddressNumber, IAddressStreets } from '@ICommon';

export interface IAddress {
    street: string;
    number: IAddressNumber;
    colony: string;
    municipality: string;
    state: string;
    country: string;
    zipCode: string;
    streets: IAddressStreets;
}