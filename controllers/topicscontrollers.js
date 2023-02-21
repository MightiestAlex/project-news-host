const {topicsArray} = require('../models/topicsmodels.js');

module.exports = {

    getTopics: function(request, response, next){
        topicsArray().then((array)=>{
            response.status(200).send({topics: array})

        }).catch(next)
    }
};