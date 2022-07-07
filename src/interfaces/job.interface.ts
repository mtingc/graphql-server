import { IDetails } from './details.interface';

export interface IJob {
    id: string;
    title: string;
    description: string;
    image: string;
    details: IDetails;
}