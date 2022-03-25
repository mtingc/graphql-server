const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');

const connectDB = require('./config/db');

// Connect to the DB
connectDB();

// server
const server = new ApolloServer({
    typeDefs,
    resolvers
});


// start server
server.listen().then( ({url}) => {
    console.log(`Server works! in ${url}`)
});