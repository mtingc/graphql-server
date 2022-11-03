import { PersonalizedTitleEnum } from './title.enum';

export interface IContactPersonalized {
    title: PersonalizedTitleEnum;
    name: string;
    position: string;
    email: string;
    phone: string;
}