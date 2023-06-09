const mysql = require('mysql2');


   module.exports = connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        // password: "root",
        database: 'realtor_api',
        port: 3306
      });


// module.exports = databaseConnection

