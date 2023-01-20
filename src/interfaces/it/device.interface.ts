import { IDetails } from '@ICommon';

export interface IItDevice {
    id: string;
    brand: string;
    model: string;
    idCables: string;
    details: IDetails;
}

export interface IItScreenInput {
    hdmi: number;
    vga: number;
    dvi: number;
    displayPort: number;
}

export enum ItPeripheralTypeEnum {
    KEYBOARD,
    MOUSE,
    CONTROLLER,
    SPEAKER,
    PRINTER,
    CAMERA,
    OTHER
}