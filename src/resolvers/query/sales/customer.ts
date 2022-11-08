import { IResolvers } from '@graphql-tools/utils';
import SaleCustomerService from '../../../services/sales/customer.service';

const querySalesCustomerResolvers: IResolvers = {
    Query: {

        async customer(_, { id }, { db }) {
            return new SaleCustomerService(_, { id }, { db }).details();
        },
        async customers(_, variables, context) {
            return new SaleCustomerService(_, {
                pagination: variables
            }, context).items();
        }

    }
};

export default querySalesCustomerResolvers;