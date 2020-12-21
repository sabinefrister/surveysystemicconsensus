import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Header, Table } from 'semantic-ui-react'


class Results extends Component {
	render() {
    return (
			<div>
				<Header as='h2'>Results of the Survey</Header>
				<Header as='h3'>{this.props.createSurveyData.surveyTitle}</Header>
				<Table basic='very' celled collapsing>
			    <Table.Header>
			      <Table.Row>
			      	<Table.HeaderCell>Name</Table.HeaderCell>
			      	{this.props.createSurveyData.options.map(option => (
						    <Table.HeaderCell>{option.option}</Table.HeaderCell>
							))}
			      </Table.Row>
			    </Table.Header>
			    <Table.Body>
			    	{this.props.attendeeData.map((attendee, index) => (
				    	<Table.Row>	
				        <Table.Cell>{attendee.name}</Table.Cell>
				    		{attendee.options.map((option, index) => (
				        <Table.Cell>{option.option}</Table.Cell>
				        ))}
				      </Table.Row>
			    	))}
		    	</Table.Body>
    		</Table>
			</div>
    );
  }
}

export default Results;


Results.propTypes = {
	attendeeData: PropTypes.array,
	createSurveyData: PropTypes.object,
};
