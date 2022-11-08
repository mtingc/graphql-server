import { IResolvers } from '@graphql-tools/utils';
import SalesProspectService from '../../../services/sales/prospect.service';

const querySalesProspectResolvers: IResolvers = {
    Query: {

        async prospect(_, { id }, { db }) {
            return new SalesProspectService(_, { id }, { db }).details();
        },
        async prospects(_, variables, context) {
            return new SalesProspectService(_, {
                pagination: variables
            }, context).items();
        }

    }
};

export default querySalesProspectResolvers;