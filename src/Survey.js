import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Header, Table } from 'semantic-ui-react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';




class Survey extends Component {
	constructor(props) {
    super(props);
		this.state = {};
	}

	render() {
		const dataFromServer = [
			{name: "Michael", option1: 2, option2: 6}, 
			{name: "Bine", option1: 6, option2: 5}
		]
    return (
			<React.Fragment>
				<Header as='h1'>Join this Survey</Header>
				<p>Here is your link for this survey: <a>https://www.yoursurvey.com</a></p>
				<Header as='h2'>{this.props.surveyData.surveyTitle}</Header>

				<Table basic='very' celled collapsing>
			    <Table.Header>
			      <Table.Row>
			      	<Table.HeaderCell>Name</Table.HeaderCell>
			      	{this.props.surveyData.options.map(option => (
						    <Table.HeaderCell>abc{option.option}</Table.HeaderCell>
							))}
			      </Table.Row>
			    </Table.Header>
			    <Table.Body>
			    	{/* user already taken the survey */}
			    	{dataFromServer.map((attendee, index) => (
				    	<Table.Row key={`${attendee.name}_${index}`}>		
				        <Table.Cell key={`${attendee.name}_${index}_cell1`}>{attendee.name}</Table.Cell>
				        <Table.Cell key={`${attendee.name}_${index}_cell2`}>{attendee.option1}</Table.Cell>
				        <Table.Cell key={`${attendee.name}_${index}_cell3`}>{attendee.option2}</Table.Cell>
				      </Table.Row>
			    	))}
			    </Table.Body>
		    </Table>
		    <Formik
				      onSubmit={(surveyData) => {
				        console.log(surveyData)
				      }}
				    >
				    	<Form>
					        	<Field 
		                  id="attendeeName" 
		                  name="attendeeName" 
		                  placeholder="name"
		                />

					        	<Field 
		                  id="option1" 
		                  name="option1" 
		                  placeholder="1 ... 10"
		                />

					        	<Field 
		                  id="option2" 
		                  name="option2" 
		                  placeholder="1 ... 10"
		                />

			      	</Form>
		      	</Formik>
			</React.Fragment>
    );
  }
}

export default Survey;


Survey.propTypes = {
	surveyData: PropTypes.object,
};
