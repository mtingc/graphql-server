import { IAddress, IImage, IDetails } from '@ICommon';
import { IUserJob } from '@interfaces/rrhh';

export interface IUser {
    id?: string;
    fullname: string[];
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
    job: IUserJob;
    details: IDetails;
}