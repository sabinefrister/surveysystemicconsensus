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
			showResults: false
		};
		this.showCreateSurvey = this.showCreateSurvey.bind(this);

	}

	showCreateSurvey() {
		this.setState({showCreateSurvey: true, showLanding: false})
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
	      {this.state.showCreateSurvey && <CreateSurvey />}
	      {this.state.showSurvey && <Survey />}
	      {this.state.showResults && <Results />}
	    </div>
  	)
  }
};

export default App;
