import { IAddressNumber } from './number.interface';
import { IAddressStreets } from './streets.interface';

export interface ISupplierAddress {
    street: string;
    number: IAddressNumber;
    colony: string;
    municipality: string;
    state: string;
    country: string;
    zipCode: string;
    streets: IAddressStreets;
}