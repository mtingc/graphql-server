import { IContactPersonalized } from './personalized/personalized.interface';

export interface ICustomerContact {
    email: string;
    phone: string;
    web: string;
    personalized: IContactPersonalized[];
}