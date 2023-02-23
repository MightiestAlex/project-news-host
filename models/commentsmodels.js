//const format = require('pg-format');
const db = require('../db/connection.js')

module.exports = {
    insertsComment: function(article_id, username, body){
        return db.query(
            `INSERT INTO comments
            (body, author, article_id)
            VALUES 
            ($1, $2, $3)
            RETURNING *;`, [body, username, article_id]
        )
        .then((object)=>{ return object.rows[0]})
    }
}