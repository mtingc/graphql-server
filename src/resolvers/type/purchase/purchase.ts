import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS } from '../../../config/constants';
import { IPurchaseProduct } from '../../../interfaces/purchase/product/product.interface';
import { findElements } from '../../../lib/db-operations';
import PurchaseProductService from '../../../services/purchase/product.service';
import PurchaseSupplierService from '../../../services/purchase/supplier.service';
import UsersService from '../../../services/users.service';

const typeContactResolvers: IResolvers = {
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
    PurchaseRequisition: {
        productId: async ({ productId: productsId }, _, { db }) => {

            const productId: string[] = productsId;
            return productId.map(async id => {
                const result = await new PurchaseProductService(
                    {},
                    { id },
                    { db }
                ).details();
                return result.product;
            });

        },
        userId: async ({ userId }, _, { db }) => {
            const result = await new UsersService(
                {},
                { id: userId },
                { db }
            ).details();
            return result.user;
        }
    },
};

export default typeContactResolvers;