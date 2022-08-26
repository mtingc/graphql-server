import { IUser } from './user/user.interface';
import { IPaginationOptions } from './pagination-options.interface';

// RRHH
import { IRrhhPermission } from './rrhh/permission.interface';
import { IRrhhContact } from './rrhh/contact.interface';
import { IRrhhWorkArea } from './rrhh/workArea.interface';
import { IRrhhVacant } from './rrhh/vacant/vacant.interface';

// Purchases
import { IPurchaseSupplier } from './purchase/supplier/supplier.interface';
import { IPurchaseProduct } from './purchase/product/product.interface';
import { IPurchaseRequisition } from './purchase/requisition/requisition.interface';

// Sales
import { ISaleCustomer } from './sale/customer/customer.interface';

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
    customer?: ISaleCustomer;
    pagination?: IPaginationOptions;
}