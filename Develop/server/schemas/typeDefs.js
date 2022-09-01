const { gql } = require ('apollo-server-express');

// define query me
// define mutation login, addUser, saveBook, removeBook, User, Book
const typeDefs = gql`
    type Query {
        me: User
    }
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book!]
    }
    type Book {
        _id: ID!
        title: String!
        image: String!
        link: String!
        description: String!
        author: String!
    }
    type Auth {
        token: ID!
        user: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth!
        addUser(username: String!, email: String!, password: String!) : Auth!
        saveBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
        removeBook(id: ID!): Book!
    }
`;

module.exports = typeDefs;