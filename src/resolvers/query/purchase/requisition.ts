import { IResolvers } from '@graphql-tools/utils';
import PurchaseRequisitionService from '../../../services/purchase/requisiton.service';

const queryPurchaseRequisitionResolvers: IResolvers = {
    Query: {

        async requisition(_, { id }, { db }) {
            return new PurchaseRequisitionService(_, { id }, { db }).details();
        },
        async requisitions(_, variables, context) {
            return new PurchaseRequisitionService(_, {
                pagination: variables
            }, context).items();
        },

    }
};

export default queryPurchaseRequisitionResolvers;