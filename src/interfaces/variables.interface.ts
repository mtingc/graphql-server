import { IPaginationOptions } from './pagination-options.interface';

// RRHH
import { IUser, IRrhhPermission, IRrhhContact, IRrhhWorkArea, IRrhhVacant } from '@interfaces/rrhh';

// Purchases
import { IPurchaseSupplier, IPurchaseProduct, IPurchaseRequisition } from '@interfaces/purchase';

// Sales
import { ISalesCustomer, ISalesProspect } from '@interfaces/sales';

// IT
import { IItLaptop, IItDesktop, IItScreen, IItStorage, IItRam, IItGraphic, IItCooling, IItInputDevice, IItOutputDevice, IItConsumable } from '@interfaces/it';

export interface IVariables {
    id?: string | number;
    user?: IUser;
    permission?: IRrhhPermission;
    contact?: IRrhhContact;
    workArea?: IRrhhWorkArea;
    vacant?: IRrhhVacant;
    supplier?: IPurchaseSupplier;
    product?: IPurchaseProduct;
    requisition?: IPurchaseRequisition;
    customer?: ISalesCustomer;
    prospect?: ISalesProspect;
    laptop?: IItLaptop;
    desktop?: IItDesktop;
    screen?: IItScreen;
    storage?: IItStorage;
    ram?: IItRam;
    graphic?: IItGraphic;
    cooling?: IItCooling;
    inputDevice?: IItInputDevice;
    outputDevice?: IItOutputDevice;
    consumable?: IItConsumable;
    pagination?: IPaginationOptions;
}