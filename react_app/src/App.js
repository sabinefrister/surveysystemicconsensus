import React, { Component } from 'react';
import CreateSurvey from './CreateSurvey';
import Survey from './Survey';
import Results from './Results';
import ShowDataFromServer from './ShowDataFromServer';
import { Grid, Segment, Button, Header } from 'semantic-ui-react'

import { createSurvey, postParticipantData } from './apiCall'

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
			showLanding: true,
			showCreateSurvey: false,
			showSurvey: false,
			showResults: false,
			createSurveyData: {},
			attendeeData: [
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
		this.getCreateSurveyData = this.getCreateSurveyData.bind(this);
		this.getSurveyData = this.getSurveyData.bind(this);
	}

	showCreateSurvey() {
		this.setState({showCreateSurvey: true, showLanding: false})
	}

	getCreateSurveyData(createSurveyData) {
		this.setState({createSurveyData: createSurveyData, showCreateSurvey: false, showSurvey: true})
    createSurvey(createSurveyData)
    .then(response => {
      console.log(response);
    });
	}	

	getSurveyData(surveyData) {
		this.setState({showSurvey: false, showResults: true})
		this.setState({attendeeData: [...this.state.attendeeData, surveyData], showSurvey: false, showResults: true})
    postParticipantData(surveyData)
    .then(response => {
      console.log(response);
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
		      	<CreateSurvey getCreateSurveyData={this.getCreateSurveyData} />
		      }
		      {this.state.showSurvey && 
		      	<Survey 
		      		createSurveyData={this.state.createSurveyData}
		      		getSurveyData={this.getSurveyData} 
	      		/>}
		      {this.state.showResults && 
		      	<Results 
		      		attendeeData={this.state.attendeeData} 
		      		createSurveyData={this.state.createSurveyData}
	      		/>
	      	}
	      	<div>above show data</div>
	      	<ShowDataFromServer />
		    </Segment>
	    </Grid>
  	)
  }
};

export default App;
