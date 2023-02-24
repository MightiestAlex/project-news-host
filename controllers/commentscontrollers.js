const {insertsComment} = require('../models/commentsmodels');
const {articleFromArticle_id} = require('../models/articlesmodels.js')

module.exports = {
    postComment: function(request, response, next) {
        const {article_id} = request.params;
        const {username, body} = request.body

        //filters undefined keys
        if(!username || !body){
            next({status: 400, msg: 'Missing username and/or text: please check your comment.'});
        }
        //checks that article exists
        articleFromArticle_id(article_id)
        .then(()=>{return insertsComment(article_id, username, body)})
        .then((object)=>{
            response.status(201).send({post: {author:object.author, body:object.body}})
            }).catch(next)
        }
};