import { PersonalizedTitleEnum, WorkPositionEnum } from '@ICommon';

export interface IContactPersonalized {
    title: PersonalizedTitleEnum;
    name: string;
    workPosition: WorkPositionEnum;
    email: string;
    phone: string;
}