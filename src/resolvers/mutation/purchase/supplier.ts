import { IResolvers } from '@graphql-tools/utils';
import PurchaseSupplierService from '../../../services/purchase/supplier.service';

const mutationPurchaseSupplierResolvers: IResolvers = {
    Mutation: {

        addSupplier(_, variables, context) {
            return new PurchaseSupplierService(_, variables, context).insert();
        },
        updateSupplier(_, variables, context) {
            return new PurchaseSupplierService(_, variables, context).modify();
        },
        deleteSupplier(_, variables, context) {
            return new PurchaseSupplierService(_, variables, context).delete();
        }

    }
};

export default mutationPurchaseSupplierResolvers;