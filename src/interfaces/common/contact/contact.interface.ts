import { IContactPersonalized } from '@ICommon';

export interface IContact {
    email: string;
    phone: string;
    web: string;
    personalized: IContactPersonalized[];
}