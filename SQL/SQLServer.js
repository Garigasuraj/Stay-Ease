const SQL_server = require('mysql2')

const connection = SQL_server.createConnection({
    host: 'localhost',    // Replace with your MySQL server hostname
    user: 'root',          // Replace with your MySQL username
    password: 'Gsuraj@17',          // Replace with your MySQL password
    database: 'AIRBNB' 
})

let baseQuery = "INSERT INTO listing(title,description, price, location, country) VALUES ?"

let input_data = [['Mark','its is good apartment',200,'wardhanapet','india'],         ['Mark','its is good apartment',200,'wardhanapet','india']
]

try{
    // making the connect NODE ---> MYSQL
   connection.connect((err)=>{
        if(err) {console.log(err)}
        console.log("Successfully connect to MYSQL Database")
    })
    // Making a Query to  database
    connection.query((err, result)=>{
       if(err){console.log(`Error: ${err.sqlMessage}`)}

       console.log(result)

       connection.end((err)=>{
        if (err) {
            console.error('Error closing the connection:', err.message);
            return;
        }
        console.log('Database connection closed.');
    })
    })
}
catch(error){
    console.log("E"+ error)
}

module.exports = connection;