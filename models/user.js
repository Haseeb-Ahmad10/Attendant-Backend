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
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        pin: {
            type: DataTypes.STRING,
            allowNull: false
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