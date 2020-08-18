module.exports = function (req,res) {
    return function (req, res, next) {
      console.log("running sample middleware 3");
      console.log("METHOD: ",req.method);
      if(next) {
        next();
      }    
    }
  }