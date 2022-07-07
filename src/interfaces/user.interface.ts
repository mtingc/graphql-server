import { IDetails } from './details.interface';

export interface IUser {
    id?: string;
    name: string;
    lastname: string;
    email: string;
    password?: string;
    birthday?: string;
    phone: string;
    role: string;
    lastSession?: string;
    details: IDetails;
}