const { gql } = require('apollo-server');

// schema
const typeDefs = gql`

    # User
    type User {
        id: ID
        name: String
        lastname: String
        email: String
        createdAt: String
    }

    type Token {
        token: String
    }

    input UserInput {
        name: String!
        lastname: String!
        email: String!
        password: String!
    }

    input AuthInput {
        email: String!
        password: String!
    }

    # Permission
    type Permission {
        id: ID
        reason: String
        user: ID
        day: String
        from: String
        to: String
        area: String
        state: String
        createdAt: String
    }

    input PermissionInput {
        reason: String!
        day: String!
        from: String!
        to: String!
        area: String!
        state: String!
    }

    type Query {
        # User
        getUser(token: String!) : User

        # Permission
        getPermission(id: ID!): Permission
        getPermissionsByUser: [Permission]
        getPermissions: [Permission]
    }

    type Mutation {
        # User
        registerUser(input: UserInput) : User
        authUser(input: AuthInput) : Token

        # Permission
        newPermission(input: PermissionInput) : Permission
        updatePermission(id: ID!, input: PermissionInput) : Permission
        deletePermission(id: ID!) : String
    }
`

module.exports = typeDefs;