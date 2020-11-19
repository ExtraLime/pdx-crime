const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const { newGeo } = require('./newGeo.js');
const geo = require('./data/geo-json.json');


//
const client = new pg.Client(process.env.yugaURI)


if (!client){
  console.log("no client")
} 
client.connect().then(()=>console.log('client connected')).catch(err => console.log(err))



const getInitCrimeTweets = (request, response) => {

  const q = "with t1 as (select count(location),location from twitter_query where entity like 'Portland Police log' group by location order by 1 desc limit 6) select * from t1 where location NOT IN ('Unknown');"

client.query(q, (err, results) => response.status(200).json(results.rows))
};

const getCrimeTweets = (request, response) => {
  const crime = request.params.crime;
  const q = `with t1 as (select count(location),location from twitter_query where entity like 'Portland Police log' and category like '${crime}' group by location order by 1 desc limit 6) select * from t1 where location NOT IN ('Unknown');`
client.query(q, (err, results) => response.status(200).json(results.rows))
};

const getAllMapTweets = (request, response) => {
  client.query("SELECT * FROM twitter_query order by tweet_id desc limit 100", (error, results) => {
    if (error) {
      throw error
    }
    
    response.status(200).json(results.rows)
    
  });
};

const getHoodTweets = (request, response) => {
  const hood = request.params.hood;
  client.query(`with t1 as (select count(category),category from twitter_query where entity like 'Portland Police log' and location like '${hood}' group by category order by 1 desc limit 5) select * from t1 where category NOT IN ('Unknown');`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)

  });
};

const getStartHood = (request, response) => {
  client.query("select count(category), category from twitter_query where entity like 'Portland Police log' group by category order by 1 desc limit 5;", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)

  });
};

const getInitChoroTweets = (request, response) => {
  client.query(`with t1 as (select count(location),location from twitter_query  where entity like 'Portland Police log' group by location order by 1 desc )  select * from t1 where location NOT IN ('Unknown')`, (error, results) => {
    if (error) {
      throw error
    }    
    const result = results.rows
    const formatted = newGeo(geo, result)
    
    response.status(200).json(formatted)

  });
};

const getChoroTweets = (request, response) => {
  const crime = request.params.crime;
  client.query(`with t1 as (select count(location),location from twitter_query  where entity like 'Portland Police log' and category like '${crime}' group by location order by 1 desc )  select * from t1 where location NOT IN ('Unknown')`, (error, results) => {
    if (error) {
      throw error
    }
    const result = results.rows;
    const formatted = newGeo(geo, result)
    
    response.status(200).json(formatted)
    
  });
};

const getDateRange = async (request,response) => {
  const { startDate, endDate } = request.params;
  const q = `with t1 as (select DATE(date) from twitter_query  where entity like 'Portland Police log')  select date, count(date) from t1 where date between DATE('${startDate}') and DATE('${endDate}') group by date;`;
  const { rows } = await client.query(q);
  response.status(200).send(rows)
};

const getNewHoodCrime = async (request,response) => {
  const {startDate,endDate,timeHood,timeCrime} = request.params;  

  if (timeHood === 'All' && timeCrime === 'All') {
    let q = `select * from twitter_query where entity like 'Portland Police log' and DATE(date) between DATE('${startDate}') and DATE('${endDate}') limit 550;`;
    const { rows } = await client.query(q);

    response.status(200).send(rows);

  } else if (timeHood ==='All') {
    let q = `with t1 as (select * from twitter_query where entity like 'Portland Police log' and DATE(date) between DATE('${startDate}') and DATE('${endDate}')) select * from t1 where category like '${timeCrime}' limit 550;`;
    const { rows } = await client.query(q);

    response.status(200).send(rows);

  } else if (timeCrime === 'All') {
    let q = `with t1 as (select * from twitter_query where entity like 'Portland Police log' and DATE(date) between DATE('${startDate}') and DATE('${endDate}')) select * from t1 where location like '${timeHood}' limit 550;`;
    const { rows } = await client.query(q);

    response.status(200).send(rows);

  } else {  
    let q = `with t1 as (select * from twitter_query where entity like 'Portland Police log' and DATE(date) between DATE('${startDate}') and DATE('${endDate}')) select * from t1 where location like '${timeHood}' and category like '${timeCrime}' limit 550;`;
    const { rows } = await client.query(q);
  
    response.status(200).send(rows)};
};

module.exports = {
  getInitCrimeTweets,
  getAllMapTweets,
  getCrimeTweets,
  getHoodTweets,
  getStartHood,
  getInitChoroTweets,
  getChoroTweets,
  getDateRange,
  getNewHoodCrime
} 