import { IResolvers } from '@graphql-tools/utils';
import PurchaseProductService from '../../../services/purchase/product.service';
import UsersService from '../../../services/users.service';

const typePurchaseRequisitionResolvers: IResolvers = {
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

export default typePurchaseRequisitionResolvers;