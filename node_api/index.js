const express = require('express');
const db = require('./queries')
var cors = require('cors')

const app = express(),
      bodyParser = require("body-parser");

const corsOptions = {
	origin: 'https://surveysystemicconsensus.herokuapp.com',
}
app.use(cors(corsOptions))
      
const port = process.env.PORT || 8080

app.use(bodyParser.json());

app.get('/api/survey-data', db.getSurveys);

app.post('/api/survey-data', db.createSurvey);

app.post('/api/participant-data', db.createParticipant);

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});