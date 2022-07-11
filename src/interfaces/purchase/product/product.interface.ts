import { IProductTypeService } from './typeService/typeService.interface';

import { IDetails } from '../../details.interface';

export interface IPurchaseProduct {
    id: string;
    name: string;
    description: string;
    typeService: IProductTypeService;
    brand: string;
    audited: boolean;
    supplierId: string;
    details: IDetails;
}