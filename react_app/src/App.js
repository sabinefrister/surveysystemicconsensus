import React, { Component } from 'react';
import CreateSurvey from './CreateSurvey';
import Survey from './Survey';
import Results from './Results';
import { Grid, Segment, Button, Header } from 'semantic-ui-react'
import api from './apiCall'
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
		this.createSurvey = this.createSurvey.bind(this);
		this.createParticipantData = this.createParticipantData.bind(this);
	}

	showCreateSurvey() {
		this.setState({showCreateSurvey: true, showLanding: false})
	}

	createSurvey(surveyData) {
    api.createSurvey(surveyData)
    .then(response => {
    	this.setState({
    		surveyData: {options: response.options}, 
    		surveyTitle: response.survey_name, 
    		showCreateSurvey: false, 
    		showSurvey: true })
    });
	}	

	createParticipantData(participantData) {
    api.createParticipantData(participantData)
    .then(response => {
      console.log(response);
    });
    api.getParticipantData()
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
		      	<CreateSurvey createSurvey={this.createSurvey} />
		      }
		      {this.state.showSurvey && 
		      	<Survey 
		      		surveyData={this.state.surveyData}
		      		surveyTitle={this.state.surveyTitle}
		      		createParticipantData={this.createParticipantData} 
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
