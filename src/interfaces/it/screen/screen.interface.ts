import { IDetails } from '@ICommon';
import { IItComplementary, IItEquipment, IItScreenInput } from '@interfaces/it';

export interface IItScreen {
    id: string;
    brand: string;
    model: string;
    inches: number;
    inputs?: IItScreenInput;
    complementaries?: IItComplementary[];
    equipment?: IItEquipment;
    details: IDetails;
}