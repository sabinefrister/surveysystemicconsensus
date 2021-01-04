import React, { Component } from 'react';
import CreateSurvey from './CreateSurvey';
import Survey from './Survey';
import Results from './Results';
import { Grid, Segment, Button, Header } from 'semantic-ui-react'
import { createSurvey, postParticipantData, getParticipantData, getSurveyData } from './apiCall'

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
			showLanding: true,
			showCreateSurvey: false,
			showSurvey: false,
			showResults: false,
			surveyData: {},
			participantData: [
				{name: "Nino", options: 
					[{option: 1}, {option: 10}]
				}, 
				{name: "Haba", options: 
					[{option: 5}, {option: 2}]
				},
			],
			surveyData: {}
		};
		this.showCreateSurvey = this.showCreateSurvey.bind(this);
		this.getSurveyData = this.getSurveyData.bind(this);
		this.getParticipantData = this.getParticipantData.bind(this);
	}

	showCreateSurvey() {
		this.setState({showCreateSurvey: true, showLanding: false})
	}

	getSurveyData(surveyData) {
		this.setState({surveyData: surveyData, showCreateSurvey: false, showSurvey: true})
    createSurvey(surveyData)
    .then(response => {
      console.log(response);
    });
    getSurveyData()
    .then(surveyData => {
    	console.log(surveyData)
    });
	}	

	getParticipantData(participantData) {
		this.setState({showSurvey: false, showResults: true})
		this.setState({participantData: [...this.state.participantData, participantData], showSurvey: false, showResults: true})
    postParticipantData(participantData)
    .then(response => {
      console.log(response);
    });
    getParticipantData()
    .then(participantData => {
    	console.log(participantData)
    });
	}

  componentDidMount(){
    document.title = "Survey Systemic Consensus"
  }

  render() {
  	return (
  		<Grid centered>
				<Segment basic>
		      <Header as='h1'>Survey Systemic Consensus</Header>
		      {this.state.showLanding && 
						<Button onClick={this.showCreateSurvey}>Start your survey</Button>
					}
		      {this.state.showCreateSurvey && 
		      	<CreateSurvey getSurveyData={this.getSurveyData} />
		      }
		      {this.state.showSurvey && 
		      	<Survey 
		      		surveyData={this.state.surveyData}
		      		getParticipantData={this.getParticipantData} 
	      		/>}
		      {this.state.showResults && 
		      	<Results 
		      		participantData={this.state.participantData} 
		      		surveyData={this.state.surveyData}
	      		/>
	      	}
		    </Segment>
	    </Grid>
  	)
  }
};

export default App;
