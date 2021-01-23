import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Header, Table, Segment } from 'semantic-ui-react'

const square = { width: 200, height: 200 }

class Results extends Component {
	render() {
		let winningOptionIndex = this.props.winningOption.index
		console.log()
    return (
 		 	<React.Fragment>    
				<Header as='h2'>Results of the Survey</Header>
		    <div className="circular-winner">
			    <Segment circular id="circular-winner" style={square}>
			      <Header as='h2' inverted>
			        Winner:
			        <Header.Subheader>
			        	Option {winningOptionIndex+1}: {this.props.surveyData.options[winningOptionIndex].option}
		        	</Header.Subheader>
			      </Header>
			    </Segment>
		    </div>

				<Header as='h3'>{this.props.surveyTitle}</Header>
				<Table size="large" celled>
					<colgroup>
						<col className="" />
						{this.props.surveyData.options.map((data, index) => {
							if (index === this.props.winningOption.index) {
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
		    	</Table.Body>
		    	<Table.Footer>
		    		<Table.Row>	
			        <Table.HeaderCell>Results</Table.HeaderCell>
			    		{this.props.results.map((option, index) => (
			        <Table.HeaderCell>{option.sum}</Table.HeaderCell>
			        ))}
			      </Table.Row>
		    	</Table.Footer>
    		</Table>
			</React.Fragment>
    );
  }
}

export default Results;


Results.propTypes = {
	participantData: PropTypes.array,
	results: PropTypes.array,
	winningOption: PropTypes.object,
	surveyData: PropTypes.object,
	surveyTitle: PropTypes.string,
};
