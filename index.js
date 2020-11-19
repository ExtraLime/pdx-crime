const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./queries.js');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');



const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
var corsOptions = {
  //origin: 'http://pdxcrimemap.net',
  origin:'*',
  optionsSuccessStatus: 200
}


app.use(logger('dev'));

// app.get('/', (req, res) => {
//   res.send({ message: 'endpoint working' });
// });
app.get('/neighborhood/inithood', cors(corsOptions), db.getStartHood);
app.get('/initcrime', cors(corsOptions), db.getInitCrimeTweets);
app.get('/map-tweets', cors(corsOptions), db.getAllMapTweets);
app.get('/:crime', cors(corsOptions), db.getCrimeTweets);
app.get('/neighborhood/:hood', cors(corsOptions), db.getHoodTweets);
app.get('/choro/chorodata', cors(corsOptions), db.getInitChoroTweets);
app.get('/choro/:crime', cors(corsOptions), db.getChoroTweets);
app.get('/range/:startDate/:endDate',cors(corsOptions),db.getDateRange);
app.get('/detailed/:startDate/:endDate/:timeHood/:timeCrime', cors(corsOptions),db.getNewHoodCrime)

const PORT = 5000;

// Serve static assets in production

if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')))
}

app.listen(PORT, () => console.log(`Sever listening on port ${PORT}`));
