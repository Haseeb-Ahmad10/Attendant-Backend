"use strict"

const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
         },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
         role: {
             type: DataTypes.ENUM('admin', 'user'),
             allowNull: false,
             defaultValue: 'user'
        },
        createdAt: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        })

        User.beforeCreate(user => {
            user.dataValues.createdAt = moment().unix()
            user.dataValues.updatedAt = moment().unix()
        })

    return User;
}