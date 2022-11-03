import { IDetails } from '../common/details.interface';

export interface IRrhhWorkArea {
    id: string;
    title: string;
    description: string;
    image: string;
    details: IDetails;
}