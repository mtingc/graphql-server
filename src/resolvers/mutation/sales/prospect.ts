import { IResolvers } from '@graphql-tools/utils';
import SalesProspectService from '../../../services/sales/prospect.service';

const mutationSalesProspectResolvers: IResolvers = {
    Mutation: {

        addProspect(_, variables, context) {
            return new SalesProspectService(_, variables, context).insert();
        },
        updateProspect(_, variables, context) {
            return new SalesProspectService(_, variables, context).modify();
        },
        deleteProspect(_, variables, context) {
            return new SalesProspectService(_, variables, context).delete();
        }

    }
};

export default mutationSalesProspectResolvers;