import { IResolvers } from '@graphql-tools/utils';
import bcrypt from 'bcrypt';
import { COLLECTIONS } from './../../config/constants';
import { assignDocumentId, findOneElement, insertOneElement } from '../../lib/db-operations';

const mutationUserResolvers: IResolvers = {
    Mutation: {

        async register(_, { user }, { db }) {

            // Check that the user does not exist
            const userCheck = await findOneElement(db, COLLECTIONS.USERS, { email: user.email });
            if(userCheck !== null) {
                return {
                    status: false,
                    message: `El email ${user.email} ya esta registrado.`,
                    user: null
                };
            }

            // Check the last registered user to assign ID
            user.id = await assignDocumentId(db, COLLECTIONS.USERS, {key: 'registerDate', order: -1});

            // Assign the date in ISO format in the registerDate property
            user.registerDate = new Date().toISOString();

            // Encrypt password
            user.password = bcrypt.hashSync(user.password, 10);

            // Save the document in the collection
            return await insertOneElement(db, COLLECTIONS.USERS, user)
                .then(async () => {
                    return {
                        status: true,
                        message: `El usuario con el correo ${user.email} se registro correctamente.`,
                        user
                    };
                })
                .catch((err: Error) => {
                    return {
                        status: false,
                        message: `Error inesperado. ${err}`,
                        user: null
                    };
                });
        }
        
    }
};

export default mutationUserResolvers;