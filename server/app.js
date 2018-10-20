var express = require('express');
var app = express(); 
var server = require('http').Server(app); 
var path = require('path');


const public = '/../public'; 


/**             STATICS              */
//app.use('/img',express.static(path.resolve(__dirname + public + '/img'))); 
app.use('/css',express.static(path.resolve(__dirname + public + '/css')));
app.use('/js',express.static(path.resolve(__dirname + public + '/js'))); 
app.use('/music',express.static(path.resolve(__dirname + public + '/music'))); 

/**              GETS                  */
app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname + public + '/index.html'));
});

/**              LISTEN                  */
server.listen(process.env.PORT || 5000, function(){
    console.log('escuchando en '+server.address().port);
});