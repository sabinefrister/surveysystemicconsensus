import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Header, Table } from 'semantic-ui-react'



class Survey extends Component {
	render() {
    return (
			<React.Fragment>
				<Header as='h1'>Join this Survey</Header>
				<p>Here is your link for this survey: <a>https://www.yoursurvey.com</a></p>
				<Header as='h2'>{this.props.surveyData.surveyTitle}</Header>

				<Table basic='very' celled collapsing>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>Name</Table.HeaderCell>
			        <Table.HeaderCell>Option 1</Table.HeaderCell>
			        <Table.HeaderCell>Option 2</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>

			    <Table.Body>
			      <Table.Row>
			        <Table.Cell>Michael</Table.Cell>
			        <Table.Cell>1 ... 10</Table.Cell>
			        <Table.Cell>1 ... 10</Table.Cell>
			      </Table.Row>
			      <Table.Row>
			        <Table.Cell>Sabine</Table.Cell>
			        <Table.Cell>1 ... 10</Table.Cell>
			        <Table.Cell>1 ... 10</Table.Cell>
			      </Table.Row>
			    </Table.Body>
		    </Table>
			</React.Fragment>
    );
  }
}

export default Survey;


Survey.propTypes = {
	surveyData: PropTypes.object,
};
