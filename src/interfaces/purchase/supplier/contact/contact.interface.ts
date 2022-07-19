import { IContactPersonalized } from './personalized/personalized.interface';

export interface ISupplierContact {
    email: string;
    phone: string;
    web: string;
    personalized: IContactPersonalized[];
}