import { IResolvers } from '@graphql-tools/utils';
import PurchaseRequisitionService from '../../../services/purchase/requisiton.service';

const mutationPurchaseRequisitionResolvers: IResolvers = {
    Mutation: {

        addRequisition(_, variables, context) {
            return new PurchaseRequisitionService(_, variables, context).insert();
        }

    }
};

export default mutationPurchaseRequisitionResolvers;