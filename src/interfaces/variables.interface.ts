import { IPaginationOptions } from './pagination-options.interface';

// RRHH
import { IUser, IRrhhPermission, IRrhhContact, IRrhhWorkArea, IRrhhVacant } from '@interfaces/rrhh';

// Purchases
import { IPurchaseSupplier, IPurchaseProduct, IPurchaseRequisition } from '@interfaces/purchase';

// Sales
import { ISalesCustomer, ISalesProspect } from '@interfaces/sales';

// IT
import { IItScreen } from '@interfaces/it';

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
    screen?: IItScreen;
    pagination?: IPaginationOptions;
}