import { IResolvers } from '@graphql-tools/utils';
import PurchaseSupplierService from '../../../services/purchase/supplier.service';

const mutationPurchaseSupplierResolvers: IResolvers = {
    Mutation: {

        addSupplier(_, variables, context) {
            return new PurchaseSupplierService(_, variables, context).insert();
        }

    }
};

export default mutationPurchaseSupplierResolvers;