import gql from 'graphql-tag';

// addUser mutation
export const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

// login mutation
export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// saveBook mutation
export const SAVE_BOOK = gql`
    mutation saveBook($input: newBook!) {
        saveBook(input: $input) {
           username
           _id
           bookCount
              savedBooks {
                bookId
                title
                authors
                image
                link
                description
              }
        }
    }
`;

// removeBook mutation
export const REMOVE_BOOK = gql`
    mutation RemoveBook($id: ID!) {
        removeBook(id: $id) {
            _id
            title
            image
            link
            description
            authors
        }
    }
`;