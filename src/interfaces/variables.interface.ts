import { IUser } from './user.interface';
import { IPermission } from './permission.interface';
import { IContact } from './contact.interface';
import { IVacant } from './vacant.interface';

import { IPaginationOptions } from './pagination-options.interface';

export interface IVariables {
    id?: string | number;
    user?: IUser;
    permission?: IPermission;
    contact?: IContact;
    vacant?: IVacant;
    pagination?: IPaginationOptions
}