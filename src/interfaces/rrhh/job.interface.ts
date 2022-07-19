import { IDetails } from '../details.interface';

export interface IRrhhJob {
    id: string;
    title: string;
    description: string;
    image: string;
    details: IDetails;
}