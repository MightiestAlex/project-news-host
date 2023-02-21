const db = require('../db/connection.js')

module.exports = {

    topicsArray: function(){
        return db.query(`
            SELECT slug, description
            FROM topics
            WHERE slug IS NOT NULL
            AND description IS NOT NULL; 
            `)  
        .then(({rows})=>{ 
            return rows;
        })
    }
};