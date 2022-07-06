import { IResolvers } from '@graphql-tools/utils';
import PermissionService from '../../services/rrhh/permission.service';
import JobService from '../../services/rrhh/job.service';
import VacantService from '../../services/rrhh/vacant.service';

const queryRrhhResolvers: IResolvers = {
    Query: {

        async permission(_, { id }, { db }) {
            return new PermissionService(_, { id }, { db }).details();
        },
        async permissions(_, variables, context) {
            return new PermissionService(_, {
                pagination: variables
            }, context).items();
        },
        async job(_, { id }, { db }) {
            return new JobService(_, { id }, { db }).details();
        },
        async jobs(_, variables, context) {
            return new JobService(_, {
                pagination: variables
            }, context).items();
        },
        async vacant(_, { id }, { db }) {
            return new VacantService(_, { id }, { db }).details();
        },
        async vacants(_, variables, context) {
            return new VacantService(_, {
                pagination: variables
            }, context).items();
        }

    }
};

export default queryRrhhResolvers;