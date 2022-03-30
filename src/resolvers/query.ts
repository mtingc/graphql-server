import { IResolvers } from '@graphql-tools/utils';

const resolversQuery: IResolvers = {
    Query: {
        users() {
            return [
                {
                    id: 1,
                    name: 'Martin',
                    lastname: 'Garnica',
                    email: 'majok5040@gmail.com',
                    password: '1234',
                    birthday: '18/02/01',
                    registerDate: ''
                }
            ];
        }
    }
};

export default resolversQuery;