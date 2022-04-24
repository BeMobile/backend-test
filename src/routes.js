const log = require('./logger/index');

const UserController      = require('./controller/user.controller');
const BookController      = require('./controller/book.controller');
const AuthorController    = require('./controller/author.controller');
const PublisherController = require('./controller/publisher.controller');
const SessionController   = require('./controller/session.controller');
const SellController      = require('./controller/sell.controller');

const SessionMiddleware   = require('./middleware/session.middleware');

module.exports = (app) => {
  app.get('/ping', (_, res) => {
    return res.status(200).json({ status: true, message: 'pong' });
  });

  app.post('/api/auth', SessionController.auth);

  app.get('/api/users',             SessionMiddleware, UserController.index);
  app.get('/api/user/:id',          SessionMiddleware, UserController.getById);
  app.get('/api/user/:id/purchase', SessionMiddleware, UserController.getUserPurchases);
  app.post('/api/user',             SessionMiddleware, UserController.create);
  app.put('/api/user/:id',          SessionMiddleware, UserController.update);
  app.delete('/api/user/:id',       SessionMiddleware, UserController.remove);

  app.get('/api/authors',       SessionMiddleware, AuthorController.index);
  app.get('/api/author/:id',    SessionMiddleware, AuthorController.getById);
  app.post('/api/author',       SessionMiddleware, AuthorController.create);
  app.put('/api/author/:id',    SessionMiddleware, AuthorController.update);
  app.delete('/api/author/:id', SessionMiddleware, AuthorController.remove);

  app.get('/api/publishers',       SessionMiddleware, PublisherController.index);
  app.get('/api/publisher/:id',    SessionMiddleware, PublisherController.getById);
  app.post('/api/publisher',       SessionMiddleware, PublisherController.create);
  app.put('/api/publisher/:id',    SessionMiddleware, PublisherController.update);
  app.delete('/api/publisher/:id', SessionMiddleware, PublisherController.remove);
  
  app.get('/api/products',       SessionMiddleware, BookController.index);
  app.get('/api/product/:id',    SessionMiddleware, BookController.getById);
  app.post('/api/product',       SessionMiddleware, BookController.create);
  app.put('/api/product/:id',    SessionMiddleware, BookController.update);
  app.delete('/api/product/:id', SessionMiddleware, BookController.delete);

  app.get('/api/sells', SessionMiddleware, SellController.index);
  app.post('/api/sell', SessionMiddleware, SellController.create);
}
