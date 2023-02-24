const {allUsers} = require('../models/usersmodels');

module.exports = {

    getUsers: function (request, response, next) {
        allUsers().then((array)=>{
            response.status(200).send({users: array})
        }).catch(next)
    }
}