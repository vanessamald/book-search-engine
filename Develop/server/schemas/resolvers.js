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
        login: async (_, { email, password }, { res }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('No user found');
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new Error('Password is incorrect');
            }
            const token = signToken(user._id);
            res.cookie('token', token, { httpOnly: true });
            return { user, token };
        },
        addUser: async (_, { name, email, password }, { res }) => {
            const user = await User.create({ name, email, password });
            const token = signToken(user._id);
            res.cookie('token', token, { httpOnly: true });
            return user;
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