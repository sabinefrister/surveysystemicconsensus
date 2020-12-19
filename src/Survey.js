import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Header, Table, Button } from 'semantic-ui-react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';


class Survey extends Component {
	constructor(props) {
    super(props);
		this.state = {};
	}

	render() {
    return (
			<React.Fragment>
				<Header as='h1'>Join this Survey</Header>
				<p>Here is your link to this survey: <a>https://www.yoursurvey.com</a></p>
				<Header as='h2'>{this.props.createSurveyData.surveyTitle}</Header>
    		<Formik
    			initialValues={{
    				attendeeName: '',
            option1: '',
            option2: '',
          }}
		      onSubmit={(surveyData) => {
		        this.props.getSurveyData(surveyData)
		      }}
		    >
		    	<Form>
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

					    	<Table.Row>		
					        <Table.Cell>
					        	<Field 
		                  id="attendeeName" 
		                  name="attendeeName" 
		                  placeholder="name"
		                />
					        </Table.Cell>	
					        <Table.Cell>
					        	<Field 
		                  id="option1" 
		                  name="option1" 
		                  placeholder="1 ... 10"
		                />
					        </Table.Cell>	
					        <Table.Cell>
					        	<Field 
		                  id="option2" 
		                  name="option2" 
		                  placeholder="1 ... 10"
		                />
					        </Table.Cell>
					        <Table.Cell>
					        	<Button type="submit">Submit your choices</Button>
					        </Table.Cell>
					      </Table.Row>
					    </Table.Body>
				    </Table>
		    	</Form>
      	</Formik>
			</React.Fragment>
    );
  }
}

export default Survey;


Survey.propTypes = {
	cretaeSurveyData: PropTypes.object,
	attendeeData: PropTypes.array,
	getSurveyData: PropTypes.func,
};
