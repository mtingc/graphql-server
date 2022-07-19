import { IResolvers } from '@graphql-tools/utils';
import ContactService from '../../../services/rrhh/contact.service';

const mutationRrhhContactResolvers: IResolvers = {
    Mutation: {

        addContact(_, variables, context) {
            return new ContactService(_, variables, context).insert();
        }

    }
};

export default mutationRrhhContactResolvers;