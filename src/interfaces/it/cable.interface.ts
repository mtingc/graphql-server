import { IDetails } from '@ICommon';

export interface IItCable {
    id: string;
    type: CableTypeEnum;
    inOut: IItCableInOut[];
    details: IDetails;
}

export enum CableTypeEnum {
    CABLE,
    ADAPTADOR,
    ANTENA,
    OTRO
}

export interface IItCableInOut {
    description: InOutDescriptionEnum;
    type: InOutTypeEnum;
}

export enum InOutTypeEnum {
    FEMALE,
    MALE
}

export enum InOutDescriptionEnum {
    USB_A,
    USB_B,
    USB_B_MICRO,
    USB_C,
    USB_MINI,
    USB_MICRO,
    LIGHTNING,
    TRS,
    RCA,
    XLR,
    HDMI,
    VGA,
    DVI,
    DISPLAYPORT,
    ALIMENTACION_LAPTOP,
    ALIMENTACION_PARED,
    ETHERNET
}