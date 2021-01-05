const restrictedData = require('./restrictedData');
const { v4: uuidv4 } = require('uuid');

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
  const surveyTitle = request.body.surveyData.surveyTitle;
  const options = JSON.stringify(request.body.surveyData.options); 
  const surveyLink = uuidv4()
  pool.query(
  	'INSERT INTO surveys (survey_name, options, survey_link) VALUES ($1, $2, $3) RETURNING survey_id, survey_link, survey_name, options', 
  	[surveyTitle, options, surveyLink], (error, results) => {
    if (error) {
      throw error
    }
    // map data from database
    const surveyData = {
		  survey_id: results.rows[0].survey_id,
		  survey_link: results.rows[0].survey_link,
		  survey_name: results.rows[0].survey_name,
		  options: JSON.parse(results.rows[0].options)
		}
    response.status(201).send(surveyData)
    console.log('Adding survey: ', surveyData);
  })
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