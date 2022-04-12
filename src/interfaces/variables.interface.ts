import { IPermission } from './permission.interface';
import { IUser } from './user.interface';

export interface IVariables {
    id?: string | number;
    user?: IUser;
    permission?: IPermission;
}