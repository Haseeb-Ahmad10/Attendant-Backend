const { users: Users } = require('../models/index')
const bcrypt = require('bcrypt')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../constants/index')

module.exports = {
login: async (req, res) => {
      try {
            const { email, password} = req.body

            if(!email || ! password) {
                return res.status(400).json({message: 'email and password are required'})
            }

            const user = await Users.findOne({
                where: { email }
            })

            if(!user) {
                return res.status(401).json({message: 'Invalid email or password'})
            }

            // Comparing password
            const isPasswordMatch = await bcrypt.compare(password, user.password)

            if(!isPasswordMatch) {
                return res.status(401).json({message: 'Invalid email or password'})
            }

            // create jwt token
            const token = jwt.sign({ id: user.id, email: user.email}, jwt_secret, {expiresIn: '1h'})
            // console.log(token)

            return res.status(200).json({message: 'Login successful', token, 
              user: { id: user.id, email: user.email, name: user.name, role: user.role }, 
            redirectTo: '/dashboard'
            });
        } catch (err) {
            console.log(err)
             res.status(500).json({message: 'Server error'})
        }
    },
    signup: async( req, res) => {
        try {
            const {name, email, phone, password, role} = req.body;
            if(!name || !email, !phone, !password) {
                return res.status(400).json({message: 'All fields are required'})
            }

            const existingUser = await Users.findOne({where: {email}})
            if(existingUser) {
                return res.status(400).json({message: 'Email already in use, please choose another one'})
            }
            
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = await Users.create({name, email, phone, password: hashedPassword, role: role || 'user', createdAt: moment().unix(), updatedAt: moment().unix()})

            // success respone
              const userResponse = {
                 id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role,
                createdAt: newUser.createdAt
              };
              res.status(200).json({message: 'User created successfully',user: userResponse})
        } catch (err) {
            console.log(err)
             res.status(500).json({message: 'Server error'})
        }
    },

    create: async (req, res) => {
        try{
            
        const { username, pin } = req.body;
        const user = Users.findOrCreate({
            where: {
                username
            },
            defaults: {
                pin,
                createdAt: moment().unix(),
                updatedAt: moment().unix()
            }
        })
        res.status(200).send({user})
        } catch (err) {
        console.log(err)
        res.status(500).send('something went wrong')
    }
    
},
get: async (req, res) => {
    try {
        const user = await Users.findAndCountAll({})
        res.status(200).send({ user })
    } catch (err) {
        res.status(500).send("Something went wrong")
    }
    
},
// delete: async (req, res) => {
//     try {
//         let { userId } = req.params;
//         if(!userId) {
//             return res.status(400).send('Product ID is required')
//         }
//         userId = Number(userId)
//         await Users.destroy({
//             where: {
//                 id: userId
//             }
//         })
//         res.status(200).send('User deleted successfully')
//     }  catch (err) {
//         res.status(500).send("Something went wrong")
//     }
// }

}