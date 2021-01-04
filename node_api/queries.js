const restrictedData = require('./restrictedData');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'devuser',
  host: 'localhost',
  database: 'surveysystemicconsensus',
  password: restrictedData.password,
  port: 5432,
})

const getSurveys = (request, response) => {
	console.log("inside get surveys")
  pool.query('SELECT * FROM surveys', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getSurveys
}