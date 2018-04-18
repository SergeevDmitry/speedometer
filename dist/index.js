function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const hbs = require('hbs');
const MongoClient = require('mongodb').MongoClient;

const app = express();

MongoClient.connect(process.env.MONGO_HOST, function (err, client) {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }

  const db = client.db(process.env.MONGO_DBNAME);

  runApp(db);
});

function runApp(db) {
  /*
   * Disable HSTS here, because we send this header via nginx
   */
  app.use(helmet({ hsts: false }));
  app.use(compression());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.set('views', path.join(__dirname + '/views'));
  app.set('view engine', 'hbs');

  // Register handlebars partials
  hbs.registerPartials(path.join(__dirname + '/views/partials'));

  hbs.registerHelper('format_date', date => {
    return new Date(date).toLocaleDateString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  });

  app.use(express.static(path.join(__dirname + '/public')));
  app.use(express.static(path.join(__dirname + '/views')));

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/terms', (req, res) => {
    res.render('terms');
  });

  app.get('/private-funding', (() => {
    var _ref = _asyncToGenerator(function* (req, res) {
      const subscriptions = yield db.collection('investors').find().sort({ createdAt: -1 }).toArray();

      res.render('private-funding', { subscriptions });
    });

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  })());

  app.post('/investor-subscribe', (() => {
    var _ref2 = _asyncToGenerator(function* (req, res) {
      const { email } = req.body;

      const subscription = yield db.collection('investors').findOne({ email });

      if (subscription) {
        return res.sendStatus(422);
      }

      try {
        yield db.collection('investors').updateOne({ email }, { $currentDate: { createdAt: true } }, { upsert: true });
      } catch (err) {
        return res.sendStatus(400);
      }

      res.sendStatus(200);
    });

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  })());

  app.post('/subscribe', (() => {
    var _ref3 = _asyncToGenerator(function* (req, res) {
      const { email } = req.body;

      const subscription = yield db.collection('subscriptions').findOne({ email });

      if (subscription) {
        return res.sendStatus(422);
      }

      try {
        yield db.collection('subscriptions').updateOne({ email }, { $currentDate: { createdAt: true } }, { upsert: true });
      } catch (err) {
        return res.sendStatus(400);
      }

      res.sendStatus(200);
    });

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  })());

  app.listen(process.env.PORT, () => {
    console.log('Listening on 5000');
  });
}
//# sourceMappingURL=index.js.map