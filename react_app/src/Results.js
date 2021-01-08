import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Header, Table } from 'semantic-ui-react'


class Results extends Component {
	render() {
    return (
			<div>
				<Header as='h2'>Results of the Survey</Header>
				<Header as='h3'>{this.props.surveyTitle}</Header>
				<Table basic='very' celled collapsing>
					<colgroup>
						{this.props.surveyData.options.map((data, index) => {
							if (index === this.props.winningOption.index + 1) {
								return <col className="winner" />
							} else {
								return <col className="" />
							}
						})}
					</colgroup>
			    <Table.Header>
			      <Table.Row>
			      	<Table.HeaderCell>Name</Table.HeaderCell>
			      	{this.props.surveyData.options.map(option => (
						    <Table.HeaderCell>{option.option}</Table.HeaderCell>
							))}
			      </Table.Row>
			    </Table.Header>
			    <Table.Body>
			    	{this.props.participantData.map((participant, index) => (
				    	<Table.Row>	
				        <Table.Cell>{participant.name}</Table.Cell>
				    		{participant.options.map((option, index) => (
				        <Table.Cell>{option.option}</Table.Cell>
				        ))}
				      </Table.Row>
			    	))}
			    	<Table.Row>	
				        <Table.Cell>Results</Table.Cell>
				    		{this.props.results.map((option, index) => (
				        <Table.Cell>{option.sum}</Table.Cell>
				        ))}
			      </Table.Row>
		    	</Table.Body>
    		</Table>
			</div>
    );
  }
}

export default Results;


Results.propTypes = {
	participantData: PropTypes.array,
	results: PropTypes.object,
	winningOption: PropTypes.object,
	surveyData: PropTypes.object,
	surveyTitle: PropTypes.string,
};
