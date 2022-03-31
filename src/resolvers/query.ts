import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS } from '../config/constants';

const resolversQuery: IResolvers = {
    Query: {
        async users(_, __, { db }) {
            try {
                return {
                    status: true,
                    message: 'Lista de usuarios cargada correctamente.',
                    users: await db.collection(COLLECTIONS.USERS).find().toArray()
                };
            } catch(error) {
                return {
                    status: false,
                    message: 'Error al cargar los usuarios.',
                    users: []
                }
            }
        }
    }
};

export default resolversQuery;