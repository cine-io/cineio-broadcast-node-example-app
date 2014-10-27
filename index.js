var
  express = require('express')
  , app = express()
  , port = process.env.PORT || 3000
  , CineIO = require('cine-io')
  // CINE IO API KEYS
  , keys = require('./fetch_api_keys_from_environment')()
  , publicKey = keys.publicKey
  , secretKey = keys.secretKey
  // Initialize cine.io api client
  , client = CineIO.init({secretKey: secretKey})
  , server
;

if (publicKey === undefined && secretKey === undefined){
  throw new Error("cine.io api keys were not found.");
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

// Show the project details
app.get('/', function(req, res){
  if (publicKey || secretKey){
    client.project.get(function(err, project){
      res.render('project_show', {title: 'Project/show', publicKey: publicKey, project: project, projectData: JSON.stringify(project)})
    });
  } else {
    res.render('not_configured', {title: 'Not Configured'})
  }
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

server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});
