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
        bookId: String!
        title: String!
        image: String!
        link: String!
        description: String!
        authors: [String]
    }
    input newBook {
        description: String
        title: String
        bookId: String
        image: String
        link: String
        authors: [String]
    }
    type Auth {
        token: ID!
        user: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth!
        addUser(username: String!, email: String!, password: String!) : Auth!
        saveBook(input: newBook): User
        removeBook(bookId: String!): User!
    }
`;

module.exports = typeDefs;