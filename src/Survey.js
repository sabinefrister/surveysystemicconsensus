import React, { Component } from 'react';
import PropTypes from 'prop-types'


class Survey extends Component {
	render() {
    return (
			<React.Fragment>
				<h1>Join this Survey</h1>
				<p>Here is your link for this survey: <a>https://www.yoursurvey.com</a></p>
				<h2>{this.props.surveyData.surveyTitle}</h2>
				<table>
				  <tr>
				    <td>Name</td>
				    <td>Option 1</td>
				    <td>Option 2</td>
				  </tr>
				  <tr>
				    <td>Michael</td>
				    <td>1...10</td>
				    <td>1...10</td>
				  </tr>
				</table>
			</React.Fragment>
    );
  }
}

export default Survey;


Survey.propTypes = {
	surveyData: PropTypes.object,
};
