import { IUser } from './user.interface';
import { IPermission } from './permission.interface';
import { IPaginationOptions } from './pagination-options.interface';

export interface IVariables {
    id?: string | number;
    user?: IUser;
    permission?: IPermission;
    pagination?: IPaginationOptions
}