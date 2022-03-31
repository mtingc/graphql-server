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
                };
            }
        },
        async login(_, { email, password }, { db }) {
            try {
                const user = await db.collection(COLLECTIONS.USERS).findOne({email, password});
                return {
                    status: true,
                    message: 
                        user === null
                            ? 'Contraseña y correo no correctos, sesión no iniciada'
                            : 'Usuario cargado correctamente.',
                    user
                };
            } catch(error) {
                return {
                    status: false,
                    message: 'Error al cargar el usuario.',
                    user: null
                };
            }
        }
    }
};

export default resolversQuery;