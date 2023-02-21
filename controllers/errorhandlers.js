module.exports = {
    handleStatus400: function(err, req, res, next) {

        if (err.status === 400) {
          res.status(400).send({msg : err.msg});
        } else {
          next(err);
        }
      },
  
    handleStatus500: function(err, req, res, next){
          console.log(err)
          res.sendStatus(500);      
      }
}