const Sequelize = require('sequelize');
const db = require('../connection');

const cityTbl = db.define('cities',{
    id:{
        type: Sequelize.INTEGER,
        autoincrement: true,
        primaryKey: true
    },
    city_name:{
        type:Sequelize.STRING
    }
},
{
    freezeTableName: true,
    timestamps: false,

})

module.exports = cityTbl;
