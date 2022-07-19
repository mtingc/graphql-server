import { IResolvers } from '@graphql-tools/utils';
import PurchaseProductService from '../../../services/purchase/product.service';
import UsersService from '../../../services/users.service';

const typePurchaseRequisitionResolvers: IResolvers = {
    PurchaseRequisition: {
        userId: async ({ userId }, _, { db }) => {
            const result = await new UsersService(
                {},
                { id: userId },
                { db }
            ).details();
            return result.user;
        }
    },
    RequisitionProduct: {
        productId: async ({ productId }, _, { db }) => {

            const result = await new PurchaseProductService(
                {},
                { id: productId },
                { db }
            ).details();
            return result.product;

        },
    }
};

export default typePurchaseRequisitionResolvers;