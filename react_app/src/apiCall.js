export async function getParticipantData() {
    const response = await fetch('/api/participant-data');
    return await response.json();
}

export async function getSurveyData() {
    const response = await fetch('/api/survey-data');
    return await response.json();
}

export async function createSurvey(data) {
  const response = await fetch(`/api/survey-data`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({surveyData: data})
    })
  return await response.json();
}

export async function postParticipantData(data) {
  const response = await fetch(`/api/participant-data`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({participantData: data})
    })
  return await response.json();
}