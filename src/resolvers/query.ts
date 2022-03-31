import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS, EXPIRETIME } from '../config/constants';
import JWT from '../lib/jwt';

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
                const emailVerification = await db
                                                .collection(COLLECTIONS.USERS)
                                                .findOne({ email });
                if(emailVerification === null) {
                    return {
                        status: false,
                        message: 'El usuario no existe',
                        token: null
                    };
                }
                const user = await db
                                    .collection(COLLECTIONS.USERS)
                                    .findOne({ email, password });
                if(user !== null) {
                    delete user.password;
                    delete user.birthday;
                    delete user.registerDate;
                }
                return {
                    status: true,
                    message: 
                        user === null
                            ? 'Contraseña y correo no correctos, sesión no iniciada'
                            : 'Usuario cargado correctamente.',
                    token:
                        user === null
                            ? null
                            : new JWT().sign({ user }, EXPIRETIME.H24)
                };
            } catch(error) {
                return {
                    status: false,
                    message: 'Error al cargar el usuario.',
                    token: null
                };
            }
        }
    }
};

export default resolversQuery;