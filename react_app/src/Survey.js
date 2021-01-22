import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Grid, Input, Container, Header, Button } from 'semantic-ui-react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';


const initialValues = {
	name: '',
  options: [
    {
      option: '',
    },
  ],
};


class Survey extends Component {
	constructor(props) {
    super(props);
		this.state = {};
	}

	render() {
		let data = this.props.surveyData
    return (
    	<React.Fragment>
				<Header as='h1'>Join this Survey</Header>
				<Header as='h2'>Surveytitle: "{this.props.surveyTitle}"</Header>
				<Formik
					initialValues={initialValues}
		      onSubmit={(surveyData) => {
		        this.props.createParticipantData(surveyData)
		      }}
		    >
		    	<Container text>
			    	<Form>
				    	<FieldArray name="options">
		            <Grid>
						    	<Grid.Row columns={2}>
				            <Grid.Column width={4}>
			                <label htmlFor="name">Name</label>
		                </Grid.Column>
		                <Grid.Column width={12}>
					    				<Field fluid
					    					required
					              id="participantName" 
					              as={Input}
					              name="participantName" 
					              placeholder="name"
					            />
				            </Grid.Column>
			            </Grid.Row> 
			            {data.options.length > 0 &&
		            		data.options.map((option, index) => (
			            <Grid.Row columns={2}>
				            <Grid.Column width={4}>
					            <label htmlFor={`options.${index}.option`}>{option.option}</label>
	                  </Grid.Column>
		                <Grid.Column width={12}>
		                  <Field fluid
		                  	required
		                  	min="0"
		                  	max="10"
		                  	as={Input}
		                    name={`options.${index}.option`}
		                    placeholder="0 ... 10"
		                    type="number"
		                  />
		                  <ErrorMessage
		                  name={`options.${index}.option`}
		                  component="div"
		                  className="field-error"
		                />
			            	</Grid.Column>
			            </Grid.Row> 
			            ))}
	            		<Grid.Row>
				            <Grid.Column>
				        			<Button size="large" className="float-right" type="submit">Submit your choices</Button>
				        		</Grid.Column>
			            </Grid.Row> 
		        		</Grid>
		          </FieldArray>
			    	</Form>
		    	</Container>
		  	</Formik>
	  	</React.Fragment>
    );
  }
}

export default Survey;


Survey.propTypes = {
	surveyData: PropTypes.object,
	surveyTitle: PropTypes.string,
	createParticipantData: PropTypes.func,
};
