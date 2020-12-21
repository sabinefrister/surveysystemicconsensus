import React, { Component } from 'react';
import CreateSurvey from './CreateSurvey';
import Survey from './Survey';
import Results from './Results';
import { Container, Segment, Button, Header } from 'semantic-ui-react'

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
				{name: "Michael", option1: 2, option2: 6}, 
				{name: "Bine", option1: 6, option2: 5},
				{name: "Nina", option1: 3, option2: 10},
				{name: "Helmut", option1: 10, option2: 5},
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
	}	

	getSurveyData(surveyData) {
		this.setState({surveyData: surveyData, showSurvey: false, showResults: true})
		console.log("surveyData und attendeeData")
		console.log(this.state.surveyData, this.state.attendeeData)
	}

  componentDidMount(){
    document.title = "Survey Systemic Consensus"
  }

  render() {
  	return (
  		<Container>
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
		    </Segment>
	    </Container>
  	)
  }
};

export default App;
