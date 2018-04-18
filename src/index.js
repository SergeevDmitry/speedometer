const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const hbs = require('hbs');
const MongoClient = require('mongodb').MongoClient;


const app = express();

MongoClient.connect(process.env.MONGO_HOST, function(err, client) {
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

  hbs.registerHelper('format_date', (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
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

  app.get('/private-funding', async (req, res) => {
    const subscriptions = await db.collection('investors').find().sort({ createdAt: -1 }).toArray();

    res.render('private-funding', { subscriptions });
  });

  app.post('/investor-subscribe', async (req, res) => {
    const { email } = req.body;

    const subscription = await db.collection('investors').findOne({ email });

    if (subscription) {
      return res.sendStatus(422);
    }

    try {
      await db.collection('investors').updateOne(
        { email },
        { $currentDate: { createdAt: true } },
        { upsert: true }
      );
    }
    catch (err) {
      return res.sendStatus(400);
    }

    res.sendStatus(200);
  });

  app.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    const subscription = await db.collection('subscriptions').findOne({ email });

    if (subscription) {
      return res.sendStatus(422);
    }

    try {
      await db.collection('subscriptions').updateOne(
        { email },
        { $currentDate: { createdAt: true } },
        { upsert: true }
      );
    }
    catch (err) {
      return res.sendStatus(400);
    }

    res.sendStatus(200);
  });

  app.listen(process.env.PORT, () => {
    console.log('Listening on 5000');
  });
}
