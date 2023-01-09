import { IDetails } from '@ICommon';
import { IItRam, IItStorage, IItComplementary, IItEquipment } from '@interfaces/it';

export interface IItLaptop {
    id: string;
    brand: string;
    model: string;
    inches: number;
    processor: string;
    ram: IItRam[];
    storage: IItStorage[];
    dedicatedGraphic: boolean;
    complementaries?: IItComplementary[];
    equipment?: IItEquipment;
    details: IDetails;
}