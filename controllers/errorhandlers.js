module.exports = {
    handlePSQLerrors(err, req, res, next) {  
//psql errors
console.log(err.code)
      if(err.code){
       let error_response = {
          '22P02': [400, {'msg': 'Invalid article id‽'}],
          '23503': [404, {'msg': 'Invalid username'}]
        }[err.code]
        res.status(error_response[0]).send(error_response[1]);
      }
//human errors
      //posting commment with missing keys
      if (err.msg === 'Missing username or text. please check your comment.'){res.status(400).send(err)}
      //missing article id
      if (err.msg === 'Article not found check article_id.'){res.status(404).send(err)}
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
          console.log(err)
          res.status(500).send({message: "Internal server error"})     
      }
}

