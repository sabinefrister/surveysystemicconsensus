const herokuURL = "https://survey-sc-backend.herokuapp.com";
let url;
process.env.NODE_ENV === "production" ? url = herokuURL : url = "";

async function getParticipantData() {
    const response = await fetch(url + '/api/participant-data');
    return await response.json();
};

async function getSurveyDataFromServer() {
    const response = await fetch(url + '/api/survey-data');
    return await response.json();
};

async function createSurvey(data) {
  const response = await fetch(url + '/api/survey-data', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({surveyData: data})
    })
  return await response.json();
};

async function createParticipantData(data, id) {
  const response = await fetch(url + '/api/participant-data', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({participantData: data, surveyId: id})
    })
  return await response.json();
};

const api = {getParticipantData, getSurveyDataFromServer, createSurvey, createParticipantData}
export default api;