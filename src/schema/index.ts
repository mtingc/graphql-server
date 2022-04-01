import 'graphql-import-node';
import path from 'path';
import { GraphQLSchema } from 'graphql';

import resolvers from './../resolvers';

import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

// Merge .graphql
const typeDefsArray = loadFilesSync(path.join(__dirname), {
    extensions: ['graphql']
});
const mergeTypeDefsArray = mergeTypeDefs(typeDefsArray);

export const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: mergeTypeDefsArray,
    resolvers
});

export default schema;