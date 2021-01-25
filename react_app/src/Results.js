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
			        	Option {winningOptionIndex+1}: 
			        	{this.props.surveyData.options[winningOptionIndex].option}
		        	</Header.Subheader>
			      </Header>
			    </Segment>
		    </div>

				<Header as='h2'>Survey: {this.props.surveyTitle}</Header>
				<Table size="large" celled>
					<colgroup>
						<col id="" />
						{this.props.surveyData.options.map((data, index) => {
							if (index === this.props.winningOption.index) {
								return <col id="winner" className="winner" key={`col-${index}`} />
							} else {
								return <col id="" key={`col-${index}`} />
							}
						})}
					</colgroup>
			    <Table.Header>
			      <Table.Row>
			      	<Table.Cell>Name</Table.Cell>
			      	{this.props.surveyData.options.map((option, index) => (
						    <Table.Cell key={`name-${index}`} >{option.option}</Table.Cell>
							))}
			      </Table.Row>
			    </Table.Header>
			    <Table.Body>
			    	{this.props.participantData.map((participant, index) => (
				    	<Table.Row key={`participant-data-row-${index}`} >	
				        <Table.Cell key={`participant-name-cell-${index}`}>{participant.name}</Table.Cell>
				    		{participant.options.map((option, index) => (
				        <Table.Cell key={`participant-data-cell-${index}`}>{option.option}</Table.Cell>
				        ))}
				      </Table.Row>
			    	))}
		    	</Table.Body>
		    	<Table.Footer>
		    		<Table.Row>	
			        <Table.Cell>Results</Table.Cell>
			    		{this.props.results.map((option, index) => (
			        <Table.Cell key={`results-${index}`}>{option.sum}</Table.Cell>
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
