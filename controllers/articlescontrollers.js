const {allArticles, articleFromArticle_id, allArticleComments} = require('../models/articlesmodels.js');

module.exports = {

   getArticles: function(request, response, next) {
        allArticles().then((array)=>{
            response.status(200).send({articles: array})
        }).catch(next)
   },

   getArticle: function(request, response, next) {
        const { articles } = request.params;
        articleFromArticle_id(articles).then((array)=>{
            response.status(200).send({'article': array})
        }).catch(next)     
   },

   getArticleComments: function(request, response, next) {
    const { articles } = request.params;
    console.log('here')

    //chain checks if article exists then returns linked comments
    articleFromArticle_id(articles)
    .then(()=>{
        console.log(articles)
        return allArticleComments(articles)
    })
    .then((array)=>{
        return response.status(200).send({comments: array})
    }).catch(next)
   }
};

