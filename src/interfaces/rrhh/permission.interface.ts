import { IDetails } from '../common/details.interface';

export interface IRrhhPermission {
    id: string;
    type: string;
    reason: string;
    userId: string;
    from: string;
    to: string;
    authorization: boolean;
    details: IDetails;
}