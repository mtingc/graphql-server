export interface IPermission {
    id: string;
    type: string;
    reason: string;
    user: string;
    from: string;
    to: string;
    authorization: boolean;
    creationDate: string;
}