import { IResolvers } from '@graphql-tools/utils';
import RrhhContactService from '../../../services/rrhh/contact.service';

const mutationRrhhContactResolvers: IResolvers = {
    Mutation: {

        addContact(_, variables, context) {
            return new RrhhContactService(_, variables, context).insert();
        },
        updateContact(_, variables, context) {
            return new RrhhContactService(_, variables, context).modify();
        },
        deleteContact(_, variables, context) {
            return new RrhhContactService(_, variables, context).delete();
        }

    }
};

export default mutationRrhhContactResolvers;