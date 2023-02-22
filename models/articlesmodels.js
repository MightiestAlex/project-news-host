const db = require('../db/connection.js');

module.exports = {

    allArticles: function(){
        return db.query(
            `SELECT articles.*, COUNT(comments.article_id)::INT AS comment_count 
            FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id
            GROUP BY articles.article_id, comments.article_id 
            ORDER BY articles.created_at DESC;
            `)
        .then((data) => {
            return data.rows;
        })
    }
};
