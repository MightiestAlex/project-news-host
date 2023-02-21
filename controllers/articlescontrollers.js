const {allArticles} = require('../models/articlesmodels.js');

module.exports = {

   getArticles: function(request, response, next) {
        allArticles().then((array)=>{
            console.log(array)
            response.status(200).send({articles: array})
        })
   }
};

