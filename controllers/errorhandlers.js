module.exports = {
    handlePSQLerrors(err, req, res, next) {  
//psql errors
      console.log(err)
      if(err.code){
       let error_response = {
          '22P02': [400, {'msg': 'Invalid article id‽'}],
          '23503': [404, {'msg': 'Invalid username'}]
        }[err.code]
        res.status(error_response[0]).send(error_response[1]);
      }
//human errors
      if(err.msg && err.status){
        res.status(err.status).send({msg: err.msg})
      }
      next(err)
    },

    handleStatus400: function(err, req, res, next) {
        if (err.status === 400) {
          res.status(400).send({msg : err.msg});
        } else {
          next(err);
        }
      },
  
    handleStatus500: function(err, req, res, next){
        res.status(500).send({message: "No server for you."})     
      }
}

