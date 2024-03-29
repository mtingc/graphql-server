import { IResolvers } from '@graphql-tools/utils';
import SaleCustomerService from '../../../services/sales/customer.service';

const mutationSalesCustomerResolvers: IResolvers = {
    Mutation: {

        addCustomer(_, variables, context) {
            return new SaleCustomerService(_, variables, context).insert();
        },
        updateCustomer(_, variables, context) {
            return new SaleCustomerService(_, variables, context).modify();
        },
        deleteCustomer(_, variables, context) {
            return new SaleCustomerService(_, variables, context).delete();
        }

    }
};

export default mutationSalesCustomerResolvers;