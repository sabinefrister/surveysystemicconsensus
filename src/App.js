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
			surveyData: {}
		};
		this.showCreateSurvey = this.showCreateSurvey.bind(this);
		this.getCreateSurveyData = this.getCreateSurveyData.bind(this);

	}

	showCreateSurvey() {
		this.setState({showCreateSurvey: true, showLanding: false})
	}

	getCreateSurveyData(surveyData) {
		this.setState({surveyData: surveyData, showCreateSurvey: false, showSurvey: true})
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
		      {this.state.showSurvey && <Survey surveyData={this.state.surveyData} />}
		      {this.state.showResults && <Results />}
		    </Segment>
	    </Container>
  	)
  }
};

export default App;
