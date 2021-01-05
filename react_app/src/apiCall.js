async function getParticipantData() {
    const response = await fetch('/api/participant-data');
    return await response.json();
}

async function getSurveyDataFromServer() {
    const response = await fetch('/api/survey-data');
    return await response.json();
}

async function createSurvey(data) {
	console.log("inside create Survey api call")
  const response = await fetch(`/api/survey-data`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({surveyData: data})
    })
  return await response.json();
}

async function postParticipantData(data) {
  const response = await fetch(`/api/participant-data`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({participantData: data})
    })
  return await response.json();
}

exports.getParticipantData = getParticipantData;
exports.getSurveyDataFromServer = getSurveyDataFromServer;
exports.createSurvey = createSurvey;
exports.postParticipantData = postParticipantData;