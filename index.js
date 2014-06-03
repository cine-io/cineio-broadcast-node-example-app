var express = require('express');
var app = express();
var CineIO = require('cine-io');
// CINE IO API KEYS
var publicKey = process.env.CINE_IO_PUBLIC_KEY;
var secretKey = process.env.CINE_IO_SECRET_KEY;
var client = CineIO.init({secretKey: secretKey});

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

// Show the project details
app.get('/', function(req, res){
  client.project.get(function(err, project){
    res.render('project_show', {title: 'Project/show', publicKey: publicKey, project: project, projectData: JSON.stringify(project)})
  });
});

// Show all the streams
app.get('/streams', function(req, res){
  client.streams.index(function(err, streams){
    res.render('streams_index', {title: 'Streams/index', publicKey: publicKey, streams: streams, streamsData: JSON.stringify(streams)})
  });
});

// Create a new stream
app.get('/streams/create', function(req, res){
  client.streams.create(function(err, stream){
    res.redirect('/stream/'+stream.id)
  });
});

// Show a specific stream
app.get('/stream/:id', function(req, res){
  client.streams.get(req.params.id, function(err, stream){
    res.render('streams_show', {title: 'Streams/show', publicKey: publicKey, id: stream.id, password: stream.password, streamData: JSON.stringify(stream)})
  });
});

// download the fmle profile for a stream
app.get('/stream/:id/fmleProfile', function(req, res){
  client.streams.fmleProfile(req.params.id, function(err, profile){
    res.attachment(""+req.params.id+".xml");
    res.send(profile);
  });
});

var port = process.env.PORT;
port || (port = 3000);

var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});
