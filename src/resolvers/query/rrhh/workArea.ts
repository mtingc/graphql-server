import { IResolvers } from '@graphql-tools/utils';
import RrhhWorkAreaService from '../../../services/rrhh/workArea.service';

const queryRrhhWorkAreaResolvers: IResolvers = {
    Query: {

        async workArea(_, { id }, { db }) {
            return new RrhhWorkAreaService(_, { id }, { db }).details();
        },
        async workAreas(_, variables, context) {
            return new RrhhWorkAreaService(_, {
                pagination: variables
            }, context).items();
        }

    }
};

export default queryRrhhWorkAreaResolvers;