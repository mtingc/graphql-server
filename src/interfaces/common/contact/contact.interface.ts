import { IContactPersonalized } from './personalized/personalized.interface';

export interface IContact {
    email: string;
    phone: string;
    web: string;
    personalized: IContactPersonalized[];
}