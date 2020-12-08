import React, { Component } from 'react';
import CreateSurvey from './CreateSurvey';
import Survey from './Survey';
import Results from './Results';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
			showCreateSurvey: false,
		};
		this.showCreateSurvey = this.showCreateSurvey.bind(this);

	}

	showCreateSurvey() {
		this.setState({showCreateSurvey: true})
	}

  componentDidMount(){
    document.title = "Survey Systemic Consensus"
  }

  render() {
  	return (
			<div className="App">
	      <h1>Survey Systemic Consensus</h1>
	      <button onClick={this.showCreateSurvey}>Start your survey</button>
	      <CreateSurvey />
	      <Survey />
	      <Results />
	    </div>
  	)
  }
};

export default App;
