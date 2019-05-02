
const Sequelize = require('sequelize');

console.log('** In connection');
var connection = new Sequelize('weather-db','root', '1Plokijuh',{
    host:'localhost',
    dialect: 'mysql',
    operatorAliases: false,
    pool: {
        max:5,
        min:0,
        acquire:30000,
        idle: 10000
    }
});

 
connection.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:');
    //console.error('Unable to connect to the database:', err);
    connection = null;
});


 

 module.exports = connection;