const { gql } = require('apollo-server');

// schema
const typeDefs = gql`
    type Query {
        get: String
    }
`

module.exports = typeDefs;