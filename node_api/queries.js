const restrictedData = require('./restrictedData');
const { v4: uuidv4 } = require('uuid');


let devConfig = {
  user: 'devuser',
  host: 'localhost',
  database: 'surveysystemicconsensus',
  password: restrictedData.password,
  port: 5432,
}

let herokuConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}
let config;
process.env.DATABASE_URL ? config = herokuConfig : config = devConfig

const Pool = require('pg').Pool
const pool = new Pool(config)

const getSurveys = (request, response) => {
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
  	'INSERT INTO surveys (survey_name, options, survey_link) VALUES ($1, $2, $3) ' + 
  	'RETURNING survey_id, survey_link, survey_name, options', 
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

const createParticipant = (request, response) => {
  const participantName = request.body.participantData.participantName;
  const options = JSON.stringify(request.body.participantData.options); 
  const surveyId = request.body.surveyId;

  pool.query('INSERT INTO participants (participant_name, options, survey_id) VALUES ($1, $2, $3)', 
  	[participantName, options, surveyId], (error, results) => {
    if (error) {
      throw error
    }
    pool.query('SELECT participant_name, options FROM participants WHERE survey_id = ($1)', 
    	[surveyId], (error, results) => {
	    if (error) {
	      throw error
	    }

	    // map data from database
	    let participantData = [];
	    results.rows.map((data, index) => {
	    	let options = []
	    	let optionsFromDatabase = JSON.parse(data.options)
	    	optionsFromDatabase.map((option, index) => {
	    		options.push(option)
	    	})
	    	participantData.push({
	    		name: data.participant_name,
	      	options: options
	    	})
	    })

    	// create a list for calculation the results of the survey
    	let resultsFromSurvey = []
    	// create list structure beforehand to easily push values
    	for (var i = 0; i < participantData[0].options.length; i++) {
    		resultsFromSurvey.push({name: `option${i}`, values: [], sum: 0, winner: false})
    	}
    	participantData.map((participant, index) => {
    		participant.options.map((option, index) => {
    			resultsFromSurvey[index].values.push(option.option)
    			resultsFromSurvey[index].sum += option.option
    		})
    	})

  		// choose winning option
  		let winningOption = {index: 0, sum: Number.MAX_SAFE_INTEGER}
  		resultsFromSurvey.map((option, index) => {
  			if (option.sum < winningOption.sum) {
  				winningOption.index = index;
  				winningOption.sum = option.sum
  			}
  		})

    	// Todo check as test
    	console.log("Test if length and values length is the same")
    	console.log(participantData.length, resultsFromSurvey[0].values.length)

	    response.status(201).send({participantData, resultsFromSurvey, winningOption})
	    console.log('Adding participant data')
	  })
  })
}

module.exports = {
  getSurveys,
  createSurvey,
  createParticipant
}