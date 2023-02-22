const db = require('../db/connection.js')


//need to input error handeling this is just the simplest of frameworks!!

module.exports = {
    allUsers: function(){
        return db.query(
            `SELECT * 
            FROM users`
        ).then(({ rows })=>{return rows})
    }
}