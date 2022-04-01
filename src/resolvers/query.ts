import bcrypt from 'bcrypt';
import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS, EXPIRETIME, MESSAGES } from '../config/constants';
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
                // Verify that the email is registered
                const user = await db
                                    .collection(COLLECTIONS.USERS)
                                    .findOne({ email });
                if(user === null) {
                    return {
                        status: false,
                        message: 'El usuario no existe',
                        token: null
                    };
                }

                // Verify encrypted password
                const passwordCheck = bcrypt.compareSync(password, user.password);

                // Hide properties
                if(passwordCheck !== null) {
                    delete user.password;
                    delete user.birthday;
                    delete user.registerDate;
                }

                return {
                    status: true,
                    message: 
                        !passwordCheck
                            ? 'Contraseña y correo no correctos, sesión no iniciada'
                            : 'Usuario cargado correctamente.',
                    token:
                        !passwordCheck
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
        },
        async me(_, __, { token }) {
            let info = new JWT().verify(token);
            if(info === MESSAGES.TOKEN_VERIFICATION_FAILED) {
                return {
                    status: false,
                    message: info,
                    user: null
                };
            }
            return {
                status: true,
                message: 'Usuario authenticado mediante token.',
                user: Object.values(info)[0]
            };
        }

    }
};

export default resolversQuery;