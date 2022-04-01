import { IResolvers } from '@graphql-tools/utils';
import bcrypt from 'bcrypt';
import { COLLECTIONS } from './../../config/constants';

const mutationUserResolvers: IResolvers = {
    Mutation: {

        async register(_, { user }, { db }) {

            // Check that the user does not exist
            const userCheck = await db.collection(COLLECTIONS.USERS)
                                    .findOne({ email: user.email });
            if(userCheck !== null) {
                return {
                    status: false,
                    message: `El email ${user.email} ya esta registrado.`,
                    user: null
                };
            }

            // Check the last registered user to assign ID
            const lastUser = await db.collection(COLLECTIONS.USERS)
                                    .find()
                                    .limit(1)
                                    .sort({ registerDate: -1 }).toArray();
            if(lastUser.length === 0) {
                user.id = 1;
            } else {
                user.id = lastUser[0].id +1;
            }

            // Assign the date in ISO format in the registerDate property
            user.registerDate = new Date().toISOString();

            // Encrypt password
            user.password = bcrypt.hashSync(user.password, 10);

            // Save the document in the collection
            return await db
                        .collection(COLLECTIONS.USERS)
                        .insertOne(user)
                        .then(
                            async () => {
                                return {
                                    status: true,
                                    message: `El usuario con el correo ${user.email} se registro correctamente.`,
                                    user
                                };
                            }
                        ).catch((err: Error) => {
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