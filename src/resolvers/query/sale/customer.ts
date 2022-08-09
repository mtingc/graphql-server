import { IResolvers } from '@graphql-tools/utils';
import SaleCustomerService from '../../../services/sale/customer.service';

const querySaleCustomerResolvers: IResolvers = {
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

export default querySaleCustomerResolvers;