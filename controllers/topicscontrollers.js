const {allTopics} = require('../models/topicsmodels.js');

module.exports = {

    getTopics: function(request, response, next){
        allTopics().then((array)=>{
            response.status(200).send({topics: array})

        }).catch(next)
    }
};