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
			surveyTitle: "",
			surveyId: 0,
			surveyData: {},
			participantData: []
		};
		this.showCreateSurvey = this.showCreateSurvey.bind(this);
		this.createSurvey = this.createSurvey.bind(this);
		this.createParticipantData = this.createParticipantData.bind(this);
		this.createNewParticipant = this.createNewParticipant.bind(this);
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
    		surveyId: response.survey_id,
    		showCreateSurvey: false, 
    		showSurvey: true 
    	})
    });
	}	

	createParticipantData(participantData) {
    api.createParticipantData(participantData, this.state.surveyId)
    .then(response => {
      this.setState({
				participantData: response.participantData,
				results: response.resultsFromSurvey, 
				showSurvey: false, 
				showResults: true
			})
    });
	}

	createNewParticipant() {
		this.setState({ showSurvey: true, showResults: false,})
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
		      	<React.Fragment>
			      	<Results 
			      		participantData={this.state.participantData} 
			      		results={this.state.results}
			      		surveyData={this.state.surveyData}
			      		surveyTitle={this.state.surveyTitle}
		      		/>
		      		<Button onClick={this.createNewParticipant}>New Participant</Button>
	      		</React.Fragment>
	      	}
		    </Segment>
	    </Grid>
  	)
  }
};

export default App;
