const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./jwtService');

const createUser = async (newUser) => {
    const { name, email, password, phone, address } = newUser;

    try {
        const checkUser = await User.findOne({ email: email });
        if (checkUser !== null) {
            return {
                status: 'error',
                message: 'The email is already in use, please try again',
            };
        }

        // Kiểm tra xem password có phải là chuỗi không
        if (typeof password !== 'string') {
            return {
                status: 'error',
                message: 'Password must be a string',
            };
        }

        // Sử dụng bcrypt.hash để mã hóa mật khẩu
        const saltRounds = 10;  // Đảm bảo rằng saltRounds là một số
        const hash = await bcrypt.hash(password, saltRounds);

        const createdUser = new User({
            name,
            email,
            password: hash,
            phone,
            address 
        });

        await createdUser.save();

        return {
            status: 'OK',
            message: 'User created successfully',
            data: createdUser
        };
    } catch (error) {
        console.error('Error message:', error.message);

        return {
            status: 'error',
            message: error.message || 'An error occurred'
        };
    }
}

const loginUser = async (userLogin) => {
    const { email, password } = userLogin;

    try {
        const checkUser = await User.findOne({ email: email });
        if (checkUser === null) {
            return {
                status: 'error',
                message: 'The user is not defined',
            };
        }

        // Sử dụng bcrypt.compare để so sánh mật khẩu
        const comparePassword = await bcrypt.compare(password, checkUser.password);
        
        if (!comparePassword) {
            return {
                status: 'error',
                message: 'The password is incorrect',
            };
        } 

        const access_token = generalAccessToken({
                id : checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

        const refresh_token = generalRefreshToken({
                id : checkUser.id,
                isAdmin: checkUser.isAdmin,
        })
        console.log('access_token :',access_token);
        return {
            status: 'OK',
            message: 'User logged in successfully',
            access_token,
            refresh_token
        };
    } catch (error) {
        console.error('Error message:', error.message);

        return {
            status: 'error',
            message: error.message || 'An error occurred'
        };
    }
}

module.exports = {
    createUser,
    loginUser
}
