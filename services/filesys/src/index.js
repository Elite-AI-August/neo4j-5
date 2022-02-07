var restify = require('restify')
// var fs = require('fs') // node filesys lib

function respond(req, res, next) {
  res.send('hello ' + req.params.name)
  next()
}

// const path = './data.json'
// const s = fs.readFileSync(path)
// this.rows = JSON.parse(s)

var server = restify.createServer()
server.get('/hello/:name', respond)
server.head('/hello/:name', respond)

server.listen(4441, function () {
  console.log('%s listening at %s', server.name, server.url)
})
