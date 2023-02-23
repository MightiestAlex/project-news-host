const {allArticles, articleFromArticle_id, allArticleComments, patchVotes} = require('../models/articlesmodels.js');

module.exports = {

   getArticles: function(request, response, next) {
        allArticles().then((array)=>{
            response.status(200).send({articles: array})
        }).catch(next)
   },

   getArticle: function(request, response, next) {
        const { articles } = request.params;
        articleFromArticle_id(articles)
        .then((array)=>{
            response.status(200).send({'article': array})
        }).catch(next)     
   },

   getArticleComments: function(request, response, next) {
    const { articles } = request.params;

    //chain checks if article exists then returns linked comments
    articleFromArticle_id(articles)
    .then(()=>{
        console.log(articles)
        return allArticleComments(articles)
    })
    .then((object)=>{
        response.status(200).send({comments: object})
    }).catch(next)
   },

   patchArticleVotes: function(request, response, next) {
    const {article_id} = request.params
    const {inc_votes} = request.body

    patchVotes(article_id, inc_votes)
    .then((object)=>{
        response.status(200).send({article: object})
    }).catch(next)
   }
};

