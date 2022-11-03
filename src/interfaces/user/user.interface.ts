import { IAddress } from '../common/address/address.interface';
import { IImage } from '../common/image.interface';
import { IDetails } from '../common/details.interface';

import { IUserJob } from './job/job.interface';

export interface IUser {
    id?: string;
    name: string;
    lastname: string;
    birthday: string;
    gender: string;
    maritalStatus: string;
    curp: string;
    address: IAddress;
    email: string;
    password?: string;
    phone: string;
    role: string;
    lastSession?: string;
    avatar: IImage;
    rfc: string;
    schooling: string;
    nss: string;
    infonavitCredit: boolean;
    job: IUserJob;
    details: IDetails;
}