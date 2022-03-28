const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

const createToken = (user, secret, expiresIn) => {
    const { id, email, name, lastname } = user;

    return jwt.sign( { id, email, name, lastname }, secret, { expiresIn } )
}

const resolvers = {
    Query: {
        getUser: async (_, { token }) => {
            const userId = await jwt.verify(token, process.env.SECRET);

            return userId;
        }
    },
    Mutation: {

        registerUser: async (_, { input }) => {

            const { email, password } = input;

            // Check duplicate users
            const checkUser = await User.findOne({email});
            if(checkUser) {
                throw new Error('Usuario registrado');
            }

            // Hash pass
            const salt = bcryptjs.genSaltSync(10);
            input.password = bcryptjs.hashSync(password, salt);

            try {
                // Save user
                const user = new User(input);
                user.save();
                return user;
            } catch (error) {
                console.log(error);
            }
        },

        authUser: async (_, {input}) => {

            const { email, password } = input;

            // Check if the user exists
            const checkUser = await User.findOne({email});
            if (!checkUser) {
                throw new Error('El usuario no existe');
            }

            // Check if the pass is correct
            const checkPass = await bcryptjs.compare( password, checkUser.password );
            if (!checkPass) {
                throw new Error('La contraseña es incorrecta');
            }

            // Create token
            return {
                token: createToken(checkUser, process.env.SECRET, '24h')
            }

        },

    }
}

module.exports = resolvers;