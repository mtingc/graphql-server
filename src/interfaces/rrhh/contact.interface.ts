import { IDetails } from "../common/details.interface";

export interface IRrhhContact {
    id: string;
    name: string;
    email: string;
    phone: string;
    age: number;
    vacantId: string;
    attended: boolean;
    details: IDetails;
}