const express = require('express');
const db = require('./queries')

const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

// place holder for the data
let surveyDataList;
let surveyTitle = "";
const participantDataList = [];

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.json("server is available");
});

app.get('/api/participant-data', (request, response) => {
  console.log('api/participants called!')
  response.json(participantDataList);
});

// app.get('/api/survey-data', (request, response) => {
//   console.log('api/survey data called!')
//   response.json({surveyTitle, options: surveyDataList});
// });

app.get('/api/survey-data', db.getSurveys);

app.post('/api/survey-data', (request, response) => {
  const surveyData = request.body.surveyData;
  surveyTitle = surveyData.surveyTitle
  surveyDataList = surveyData.options;
  console.log('Adding survey: ', surveyData);
  response.json("surveyData added");
  // negative case?
});

app.post('/api/participant-data', (request, response) => {
  const participantData = request.body.participantData;
  participantDataList.push(participantData);
  console.log('Adding participant data: ', participantData);
  response.json("participant data added");
  // negative case?
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});