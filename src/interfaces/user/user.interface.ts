import { IAddress } from '../address/address.interface';
import { IUserJob } from './job.interface';

import { IImage } from '../image.interface';
import { IDetails } from '../details.interface';

export interface IUser {
    id?: string;
    name: string;
    lastname: string;
    email: string;
    password?: string;
    phone: number;
    birthday: string;
    gender: string;
    address: IAddress;
    maritalStatus: string;
    curp: string;
    rfc: string;
    schooling: string;
    nss: number;
    infonavitCredit: boolean;
    avatar: IImage;
    role: string;
    job: IUserJob;
    lastSession?: string;
    details: IDetails;
}