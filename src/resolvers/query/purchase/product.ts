import { IResolvers } from '@graphql-tools/utils';
import PurchaseProductService from '../../../services/purchase/product.service';

const queryPurchaseProductResolvers: IResolvers = {
    Query: {

        async product(_, { id }, { db }) {
            return new PurchaseProductService(_, { id }, { db }).details();
        },
        async products(_, variables, context) {
            return new PurchaseProductService(_, {
                pagination: variables
            }, context).items();
        },

    }
};

export default queryPurchaseProductResolvers;