const db = require('../db/connection.js');

module.exports = {

    allArticles: function(){

        return db.query(`
        SELECT  author, title, article_id, topic, created_at, votes, article_img_url
        FROM    articles
        ORDER BY  article_id  DESC;
        `).then((data) => {
            return data.rows;
        })
    }
};
