const Webapp = require('./webapp.js');

let app = Webapp.create();

app.postUse((req,res)=>{
  if(!res.finished){
    res.statusCode = 404;
    res.write("file not Found");
    res.end();
  }
});

module.exports = app;
