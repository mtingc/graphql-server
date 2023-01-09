import { IDetails } from '@ICommon';
import { IVacantAvailable, IVacantDescription } from '@interfaces/rrhh';

export interface IRrhhVacant {
    id: string;
    jobId: string;
    title: string;
    description: IVacantDescription;
    available: IVacantAvailable;
    details: IDetails;
}