var express = require('express'); // se llama la libreria express
var app = express(); // se crea un objeto de la libreria
var server = require('http').Server(app); // se llama la libreria http y se manda express
var path = require('path'); // Se llama la libreria Path para path's

var public = '/../public'; // Paths donde esta la parte publica
app.use('/css',express.static(path.resolve(__dirname + public + '/css'))); // direccion del css
app.use('/js',express.static(path.resolve(__dirname + public + '/js'))); // direccion del javascript
app.use('/audio',express.static(path.resolve(__dirname + public + '/audio'))); // direccion de las imagenes
app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname + public + '/index.html')); // si se pide / llama al index
});
app.get('/',function(req,res){
    res.sendFile(path.resolve(__dirname + public + '/index.html')); // si se pide / llama al index
});
server.listen(process.env.PORT || 5000,function(){
    console.log('escuchando en '+server.address().port);
});