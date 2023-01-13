import { IPaginationOptions } from './pagination-options.interface';

// RRHH
import { IUser, IRrhhPermission, IRrhhContact, IRrhhWorkArea, IRrhhVacant } from '@interfaces/rrhh';

// Purchases
import { IPurchaseSupplier, IPurchaseProduct, IPurchaseRequisition } from '@interfaces/purchase';

// Sales
import { ISalesCustomer, ISalesProspect } from '@interfaces/sales';

// IT
import { IItLaptop, IItDesktop, IItScreen, IItInputDevice, IItOutputDevice, IItConsumable, IItStorage, IItRam, IItGraphic, IItCooling, IItComplementary } from '@interfaces/it';

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
    // IT
    laptop?: IItLaptop;
    desktop?: IItDesktop;
    screen?: IItScreen;
    inputDevice?: IItInputDevice;
    outputDevice?: IItOutputDevice;
    consumable?: IItConsumable;
    storage?: IItStorage;
    ram?: IItRam;
    graphic?: IItGraphic;
    cooling?: IItCooling;
    complementary?: IItComplementary;
    pagination?: IPaginationOptions;
}