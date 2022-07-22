import { IResolvers } from '@graphql-tools/utils';
import PurchaseRequisitionService from '../../../services/purchase/requisiton.service';

const mutationPurchaseRequisitionResolvers: IResolvers = {
    Mutation: {

        addRequisition(_, variables, context) {
            return new PurchaseRequisitionService(_, variables, context).insert();
        },
        updateRequisition(_, variables, context) {
            return new PurchaseRequisitionService(_, variables, context).modify();
        },
        deleteRequisition(_, variables, context) {
            return new PurchaseRequisitionService(_, variables, context).delete();
        }

    }
};

export default mutationPurchaseRequisitionResolvers;