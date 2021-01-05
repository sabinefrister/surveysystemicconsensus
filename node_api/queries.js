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
  pool.query('SELECT * FROM surveys', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getParticipantData = (request, response) => {
  pool.query('SELECT * FROM surveys', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createSurvey = (request, response) => {
  const { surveyTitle, options } = request.body.surveyData;
  // todo validation explizit .string machen
  const surveyLink = "5721cddd-eee4-4a26-b547-ff4767353e8a"
  // uuid generator
  pool.query(
  	'INSERT INTO surveys (survey_name, options, survey_link) VALUES ($1, $2, $3) RETURNING *', 
  	[surveyTitle, options, surveyLink], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    response.status(201).send(results.rows[0])
  })
	console.log('Adding survey: ', surveyTitle, options);
	// todo statt * alle variablen explizit machen, daraus ein javascript object machen und felder einzeln mappen
}

const createParticipantData = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

module.exports = {
  getSurveys,
  getParticipantData,
  createSurvey,
  createParticipantData
}