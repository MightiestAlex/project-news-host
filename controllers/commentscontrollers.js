const {insertsComment} = require('../models/commentsmodels');
const {articleFromArticle_id} = require('../models/articlesmodels.js')

module.exports = {
    postComment: function(request, response, next) {
        const {article_id} = request.params;
        const {username, body} = request.body

        //filters undefined keys
        if(username === undefined || body === undefined){
            next({msg: 'Missing username or text. please check your comment.'});
        }
        //checks that article exists
        articleFromArticle_id(article_id)
        .then(()=>{return insertsComment(article_id, username, body)})
        .then((object)=>{
            response.status(201).send({post: {author:object.author, body:object.body}})
            }).catch(next)
        }
};