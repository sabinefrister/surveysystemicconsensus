import React, { Component } from 'react';
import CreateSurvey from './CreateSurvey';
import Survey from './Survey';
import Results from './Results';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPoll } from '@fortawesome/free-solid-svg-icons'
import { Segment, Button, Menu } from 'semantic-ui-react'
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
				winningOption: response.winningOption,
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
			<div className="container">
				<Menu pointing secondary>
					<Menu.Item className="icon-header">
						<FontAwesomeIcon icon={faPoll} />	
					</Menu.Item>
					<Menu.Item className="nav-header">Survey Systemic Consensus</Menu.Item>
				</Menu>
	      <Segment padded='very' className="main-container">
		      {this.state.showLanding && 
		      	<React.Fragment>
							<p>
								This is a survey with the Systemic Consensus method. This means, all participants 
								vote his restistance against each option. With every option you can choose from 0 to 10.
								0 means no resistance. And 10 means absolutly resistant to this option.
							</p>
							<p>
								This method help groups to find a better solution, because less resistance to the 
								upcoming choice and more harmony inside the group.
							</p>
							<Button 
								size="massive" 
								className="center-button" 
								onClick={this.showCreateSurvey}
							>
								Start your Survey
							</Button>
						</React.Fragment>
					}
		      {this.state.showCreateSurvey && 
	      		<CreateSurvey createSurvey={this.createSurvey} />
		      }
		      {this.state.showSurvey && 
		      	<Survey 
		      		surveyData={this.state.surveyData}
		      		surveyTitle={this.state.surveyTitle}
		      		createParticipantData={this.createParticipantData} 
	      		/>
	      	}
		      {this.state.showResults && 
		      	<React.Fragment>
			      	<Results 
			      		participantData={this.state.participantData} 
			      		results={this.state.results}
			      		winningOption={this.state.winningOption}
			      		surveyData={this.state.surveyData}
			      		surveyTitle={this.state.surveyTitle}
		      		/>
		      		<Button size="large" className="center" onClick={this.createNewParticipant}>Add new Participant</Button>
	      		</React.Fragment>
	      	}
      	</Segment>
    	</div>
  	)
  }
};

export default App;
