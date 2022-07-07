import { IDetails } from './details.interface';

export interface IPermission {
    id: string;
    type: string;
    reason: string;
    userId: string;
    from: string;
    to: string;
    authorization: boolean;
    details: IDetails;
}