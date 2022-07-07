import { IDetails } from './details.interface';

export interface IContact {
    id: string;
    name: string;
    email: string;
    phone: string;
    vacantId: string;
    age: number;
    company: string;
    workPosition: string;
    message: string;
    attended: boolean;
    details: IDetails;
}