const express = require('express');
const db = require('./queries')

const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

app.use(bodyParser.json());

app.get('/api/survey-data', db.getSurveys);

app.post('/api/survey-data', db.createSurvey);

app.post('/api/participant-data', db.createParticipant);

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});