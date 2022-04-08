export interface IPermission {
    id: string;
    type: string;
    reason: string;
    user: string;
    date: string;
    from: string;
    to: string;
    authorization: boolean;
}