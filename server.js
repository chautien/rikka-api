require('dotenv').config();
const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

router.render = (req, res) => {
  if (Number.parseInt(res.statusCode) === 404) {
    res.jsonp({
      status: false,
      message: 'The path is not valid!',
      path: req.originalUrl,
    });
    return;
  }

  res.jsonp({
    author: 'TienCV',
    status: true,
    data: res.locals.data,
  });
};

server.use(middlewares);
server.use('/api', router);

server.listen(process.env.PORT || 3030, () => {
  console.log('JSON Server is running on port ' + process.env.PORT);
});
