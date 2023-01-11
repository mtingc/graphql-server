import { IResolvers } from '@graphql-tools/utils';
import ItScreenService from '../../../services/it/screen.service';

const mutationItResolvers: IResolvers = {
    Mutation: {

        // Screen
        addScreen(_, variables, context) {
            return new ItScreenService(_, variables, context).insert();
        },
        updateScreen(_, variables, context) {
            return new ItScreenService(_, variables, context).modify();
        },
        deleteScreen(_, variables, context) {
            return new ItScreenService(_, variables, context).delete();
        }

    }
};

export default mutationItResolvers;