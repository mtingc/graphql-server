import { IVacantAvailable } from './available/available.interface';
import { IVacantDescription } from './description/description.interface';
import { IDetails } from '../../details.interface';

export interface IRrhhVacant {
    id: string;
    jobId: string;
    title: string;
    description: IVacantDescription;
    available: IVacantAvailable;
    details: IDetails;
}