import { IJobSchedule } from './schedule.interface';

export interface IUserJob {
    workAreaId: string;
    description: string;
    schedule: IJobSchedule;
    salary: string;
    accountNumber: string;
}