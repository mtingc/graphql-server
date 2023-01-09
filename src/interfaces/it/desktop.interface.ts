import { IDetails } from '@ICommon';
import { IItRam, IItStorage, IItGraphic, IItCooling, IItComplementary, IItEquipment } from '@interfaces/it';

export interface IItDesktop {
    id: string;
    processor: string;
    motherboard: string;
    ram: IItRam[];
    storage: IItStorage[];
    graphic?: IItGraphic[];
    case?: string;
    coolign?: IItCooling[];
    complementaries?: IItComplementary[];
    equipment: IItEquipment;
    details: IDetails;
}