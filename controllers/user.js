// const path = require('path');
// const {  Users } = require('../models');
// const { jwt_secret } = require('../constants');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const users = [
//     { username: 'admin', pin: '0000'},
//     {username: 'haseeb', pin: '1234'}
// ]

// module.exports = {
//     login: async (req, res) => {
        
//         try{
//             const { username, pin } = req.body;

//             const user = await Users.findOne((u) => {
//                 u.username === username && u.pin === pin
//             })

//             if(!user) {
//                 return res.status(401).json({message: 'Invalid username or pin'})
//             }

//             return res.json({message: 'Login Successful'})

//             // if(username && PIN ){
//             //     // res.status(200).send( 'Login Successful')
//             //     res.json({message: 'Login Successful'})
//             // } else {
//             //     res.status(401).json({message: 'Invalid credentials'})
//             // }



//     //         if(!username || !PIN) {
//     //         return res.status(404).send('Username and PIN are required.');
//     //         }

//     //         const user = await Users.findOne({
//     //             where: {
//     //                 username
//     //             }
//     //         })

//     //         if(!user) {
//     //             return res.status(404).send('User not found.')
//     //         }

//     //         const matchedPin = await bcrypt.compare(pin, user.pin)
//     //         if(!matchedPin) {
//     //             return res.status(401).send('Invalid PIN.');
//     //         }

//     //         const plainUserObj = user.toJSON();

//     //         const token = jwt.sign(plainUserObj, jwt_secret)

//     //         return res.status(200).send({ user, token})

//         } catch(err) {
//             console.error('Login error:', err);
//             return res.status(500).send('Internal Server Error');
//         }


//     }
// }

// const { default: bcrypt } = require('bcryptjs');
const { users: Users } = require('../models/index')
const bcrypt = require('bcrypt')
const moment = require('moment')

module.exports = {
login: async (req, res) => {
      try {
            const { username, pin } = req.body

            if(!username || ! pin) {
                return res.status(400).json({message: 'Username and PIN are required'})
            }

            const user = await Users.findOne({
                where: { username, pin }
            })

            if(!user) {
                return res.status(401).json({message: 'Invalid Username or PIN'})
            }
            return res.status(200).json({redirectTo: '/dashboard'})
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

            const existingUser = Users.findOne({where: {email}})
            if(existingUser) {
                return res.status(400).json({message: 'Email already in use, please choose another one'})
            }
            
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = Users.create({name, email, phone, password: hashedPassword, role: role || 'user', createAt: moment().unix(), updatadAt: moment().unix()})

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

}