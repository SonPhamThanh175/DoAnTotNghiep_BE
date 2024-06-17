// const User = require('../models/User');

// const createUser = (newUser) => {
//     const { name, email, password ,confirmPassword ,phone } = newUser
//     return new Promise((resolve, reject) => {
//         try {
//             const createdUser = new User({
//                 name,
//                 email,
//                 password,
//                 confirmPassword,
//                 phone
//             });
//             if(createdUser){
//                 resolve({
//                     status: 'OK',
//                     message :'User created successfully',
//                     data: createdUser
//                 });
//             }
//         } catch (error) {
//             reject(error);
//         }
//     })
// }

// module.exports = {
//     createUser
// }

const User = require('../models/User');

const createUser = async (userData) => {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
    console.log(newUser);
};

module.exports = {
    createUser
};
