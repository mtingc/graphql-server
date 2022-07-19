import { IResolvers } from '@graphql-tools/utils';
import { IPurchaseProduct } from '../../../interfaces/purchase/product/product.interface';
import PurchaseSupplierService from '../../../services/purchase/supplier.service';

const typePurchaseProductResolvers: IResolvers = {
    PurchaseProductInterface: {
        __resolveType: (product: IPurchaseProduct) => {
            if (product.typeService) {
                return 'PurchaseProductService';
            }

            return 'PurchaseProduct';
        }
    },
    PurchaseProduct: {
        supplierId: async ({ supplierId }, _, { db }) => {
            const result = await new PurchaseSupplierService(
                {},
                { id: supplierId },
                { db }
            ).details();
            return result.supplier;
        }
    },
    PurchaseProductService: {
        supplierId: async ({ supplierId }, _, { db }) => {
            const result = await new PurchaseSupplierService(
                {},
                { id: supplierId },
                { db }
            ).details();
            return result.supplier;
        }
    }
};

export default typePurchaseProductResolvers;