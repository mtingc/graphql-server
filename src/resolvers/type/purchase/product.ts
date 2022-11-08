import { IResolvers } from '@graphql-tools/utils';
import PurchaseSupplierService from '../../../services/purchase/supplier.service';

const typePurchaseProductResolvers: IResolvers = {
    PurchaseProduct: {
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