import { IResolvers } from '@graphql-tools/utils';
import PurchaseSupplierService from '../../../services/purchase/supplier.service';

const queryPurchaseSupplierResolvers: IResolvers = {
    Query: {

        async supplier(_, { id }, { db }) {
            return new PurchaseSupplierService(_, { id }, { db }).details();
        },
        async suppliers(_, variables, context) {
            return new PurchaseSupplierService(_, {
                pagination: variables
            }, context).items();
        },

    }
};

export default queryPurchaseSupplierResolvers;