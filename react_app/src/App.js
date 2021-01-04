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
			surveyTitle: "Survey123",
			surveyData: {},
			participantData: {}
		};
		this.showCreateSurvey = this.showCreateSurvey.bind(this);
		this.getSurveyData = this.getSurveyData.bind(this);
		this.getParticipantData = this.getParticipantData.bind(this);
	}

	showCreateSurvey() {
		this.setState({showCreateSurvey: true, showLanding: false})
	}

	getSurveyData(surveyData) {
		console.log("data from react")
   	console.log(surveyData)
    createSurvey(surveyData)
    .then(response => {
      console.log(response);
    });
    getSurveyData()
    .then(surveyData => {
    	console.log("data from server")
    	console.log(surveyData)
    	this.setState({
    		surveyData: {options: surveyData.options}, 
    		surveyTitle: surveyData.surveyTitle, 
    		showCreateSurvey: false, 
    		showSurvey: true })
    });
	}	

	getParticipantData(participantData) {
    postParticipantData(participantData)
    .then(response => {
      console.log(response);
    });
    getParticipantData()
    .then(participantData => {
			this.setState({
				participantData: participantData, 
				showSurvey: false, 
				showResults: true
			})
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
		      		surveyTitle={this.state.surveyTitle}
		      		getParticipantData={this.getParticipantData} 
	      		/>}
		      {this.state.showResults && 
		      	<Results 
		      		participantData={this.state.participantData} 
		      		surveyData={this.state.surveyData}
		      		surveyTitle={this.state.surveyTitle}
	      		/>
	      	}
		    </Segment>
	    </Grid>
  	)
  }
};

export default App;
