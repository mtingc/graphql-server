import { IResolvers } from '@graphql-tools/utils';
import PurchaseProductService from '../../../services/purchase/product.service';

const mutationPurchaseProductResolvers: IResolvers = {
    Mutation: {

        addProduct(_, variables, context) {
            return new PurchaseProductService(_, variables, context).insert();
        },
        updateProduct(_, variables, context) {
            return new PurchaseProductService(_, variables, context).modify();
        },
        deleteProduct(_, variables, context) {
            return new PurchaseProductService(_, variables, context).delete();
        }

    }
};

export default mutationPurchaseProductResolvers;