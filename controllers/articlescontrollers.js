const {allArticles, articleFromArticle_id} = require('../models/articlesmodels.js');

module.exports = {

   getArticles: function(request, response, next) {
        allArticles().then((array)=>{
            response.status(200).send({articles: array})
        }).catch(next)
   },

   getArticle: function(request, response, next) {
        const { articles } = request.params;
        articleFromArticle_id(articles).then((article)=>{
            response.status(200).send({'article': article})
        }).catch(next)   
   },

   postComment: function(request, response, next) {
        const {article_id, body} = request.params;
        
        insertsComment(article_id, body).then((postResponse)=>{
            response.status(201).send({msg: 'Comment submitted'})
        }).catch(next)
   }
};

