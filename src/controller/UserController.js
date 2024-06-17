// const UserService = require('../services/UserService');

// const createUser = async (req,res) => {
//     try {
//         console.log(req.body);
//         const res = await UserService.createUser()
//         return res.status(200).json(res)
//     } catch (error) {
//         return res.json(404).json({
//             message: error
//         })
//     }
// }

// module.exports = {
//     createUser
// }

const UserService = require('../services/UserService');

const createUser = async (req, res) => {
    try {
        const {name ,email ,password,confirmPassword,phone} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = emailRegex.test(email) 
        if(!name || !email || !password || !confirmPassword || !phone){
            return res.status(200).json({
                status: 'error',
                message:'The input is required',
            })
        }else if(!isCheckEmail) {
            return res.status(200).json({
                status: 'error',
                message:'The email is invalid',
            })
        }else if(password !== confirmPassword) {
            return res.status(200).json({
                status: 'error',
                message:'The password is invalid',
            })
        }
        const result = await UserService.createUser(req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message || 'An error occurred'
        });
    }
};

module.exports = {
    createUser
};