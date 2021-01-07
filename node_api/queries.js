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
	 
	    let participantData = [];
	    let resultsFromOptions = [{option1: []}, {option2: [], option3: []}, {option4: []}]
	    // [{option1: [1,4,6,2,7,2]}, {option2: [3,4,2,3,5,2}]

			// gleichzeitig n Listen erstellen für die Ergebnisse der einzelnen optionen
			// -> array.length -> dann resultsOptionN... und dann hinzufügen, am Ende kann man das dann berechnen, 
			// bzw. in eine gemeinsame Liste reinschreiben,
	    results.rows.map((data, index) => {
	    	let options = []
	    	let optionsFromDatabase = JSON.parse(data.options)
	    	optionsFromDatabase.map((option, index) => {
	    		options.push(option)
	    		// hier entweder das object erstellen mit option N und dann dahin pushen oder vorher schon 
	    		// über length der options entsprechende objecte in der liste erstellen und dann hineingeben
	    		// resultsFromOptions.option.push(option)
	    		console.log(resultsFromOptions)
	    	})
	    	participantData.push({
	    		name: data.participant_name,
	      	options: options
	    	})
	    })
	    console.log(resultsFromOptions)
	    response.status(201).send(participantData)
	    console.log('Adding participant data: ', participantData)
	  })
  })
}

module.exports = {
  getSurveys,
  createSurvey,
  createParticipant
}