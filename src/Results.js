import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Header, Table } from 'semantic-ui-react'


class Results extends Component {
	render() {
    return (
			<div>
				<Header as='h2'>Results of the Survey</Header>
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
			    	{/* user already taken the survey */}
			    	{this.props.attendeeData.map((attendee, index) => (
				    	<Table.Row key={`${attendee.name}_${index}`}>		
				        <Table.Cell key={`${attendee.name}_${index}_cell1`}>{attendee.name}</Table.Cell>
				        <Table.Cell key={`${attendee.name}_${index}_cell2`}>{attendee.option1}</Table.Cell>
				        <Table.Cell key={`${attendee.name}_${index}_cell3`}>{attendee.option2}</Table.Cell>
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
