import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS } from '../../../config/constants';
import { findElements } from '../../../lib/db-operations';

const typePurchaseSupplierResolvers: IResolvers = {
    PurchaseSupplier: {
        productId: async ({ id }, _, { db }) => {

            return await findElements(
                db,
                COLLECTIONS.PURCHASES_PRODUCTS_SERVICES,
                {
                    $and: [
                        { supplierId: id }
                    ]
                }
            );

        }
    }
};

export default typePurchaseSupplierResolvers;