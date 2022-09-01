const { User } = require('../models/User');
const { signToken } = require('../utils/auth.js');

const resolvers = {
    Query: {    
        me: async (_, args, { req }) => {
            if (!req.userId) {
                return null;
            }
            const user = await User.findById(req.userId);
            return user;
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            console.log(user);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('No user found');
            }
           const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (_, { title, author, published, genres }, { req }) => {
            const user = await User.findById(req.userId);
            const book = await user.saveBook({ title, author, published, genres });
            return book;
        },
        removeBook: async (_, { id }, { req }) => {
            const user = await User.findById(req.userId);
            const book = await user.removeBook(id);
            return book;
        }
    }
}

module.exports = resolvers;