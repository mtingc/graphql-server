import { IResolvers } from '@graphql-tools/utils';
import { COLLECTIONS } from '../config/constants';

const resolversMutation: IResolvers = {
    Mutation: {
        async register(_, { user }, { db }) {
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
            // Save the document in the collection
            return await db
                        .collection(COLLECTIONS.USERS)
                        .insertOne(user)
                        .then(
                            async () => {
                                return user;
                            }
                        ).catch((err: Error) => {
                            console.log(err.message);
                            return null;
                        });
        }
    }
};

export default resolversMutation;