module.exports = {

    statusCode400: function(err, req, res, next) {

        if (err.status === 400) {
          res.status(400).send({msg : err.msg});
        } else {
          next(err);
        }
      },
  
    statusCode500: function(err, req, res, next){
          console.log(err)
          res.sendStatus(500);      
      }
}