import { PersonalizedTitleEnum } from './title.enum';
import { WorkPositionEnum } from './workPosition.enum';

export interface IContactPersonalized {
    title: PersonalizedTitleEnum;
    name: string;
    workPosition: WorkPositionEnum;
    email: string;
    phone: string;
}