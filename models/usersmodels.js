const db = require('../db/connection.js')

module.exports = {
    
    allUsers: function(){
        return db.query(`
            SELECT * 
            FROM users`
        )
        .then(({ rows })=>{return rows})
    }
}