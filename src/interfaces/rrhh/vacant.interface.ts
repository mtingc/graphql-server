import { IDetails } from '../details.interface';

export interface IRrhhVacant {
    id: string;
    jobId: string;
    title: string;
    description: string;
    available: boolean;
    details: IDetails;
}