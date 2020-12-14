import React, { Component } from 'react';
import CreateSurvey from './CreateSurvey';
import Survey from './Survey';
import Results from './Results';
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
			<div className="App">
	      <h1>Survey Systemic Consensus</h1>
	      {this.state.showLanding && 
					<button onClick={this.showCreateSurvey}>Start your survey</button>
				}
	      {this.state.showCreateSurvey && 
	      	<CreateSurvey getCreateSurveyData={this.getCreateSurveyData} />
	      }
	      {this.state.showSurvey && <Survey surveyData={this.state.surveyData} />}
	      {this.state.showResults && <Results />}
	    </div>
  	)
  }
};

export default App;
