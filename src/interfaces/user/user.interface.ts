import { IAddress } from '../address/address.interface';
import { IUserJob } from './job/job.interface';

import { IImage } from '../image.interface';
import { IDetails } from '../details.interface';

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