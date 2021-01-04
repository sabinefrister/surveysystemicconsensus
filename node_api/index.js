const express = require('express');

const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

// place holder for the data
const users = [];
const surveyDataList = [];
const surveyTitle = [];
const participantDataList = [];

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.json("server is available");
});

app.get('/api/users', (request, response) => {
  console.log('api/users called!')
  response.json(users);
});

app.post('/api/user', (request, response) => {
  const user = request.body.user;
  users.push(user);
  console.log('Adding user: ', user);
  response.json("user added");
  // negative case?
});

app.post('/api/survey-data', (request, response) => {
  const surveyData = request.body.surveyData;
  surveyTitle.push(surveyData.surveyTitle)
  surveyDataList.push(surveyData.options);
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