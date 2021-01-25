import React from 'react';
import PropTypes from 'prop-types'
import { Grid, Input, Container, Header, Button } from 'semantic-ui-react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';


let initialValues = {
	participantName: '',
};

const Survey = (props) => {
	// add n options to initialValues for controlled input
	let options = []
	for (var i = 0; i < props.surveyData.options.length; i++) {
		options.push({option: ""})
	}
	Object.assign(initialValues, {options: options})

	return (
		<React.Fragment>
			<Header as='h1'>Join this Survey</Header>
			<Header as='h2'>Survey: "{props.surveyTitle}"</Header>
			<Formik
				initialValues={initialValues}
	      onSubmit={(surveyData) => {
	        props.createParticipantData(surveyData)
	      }}
	    >
	    	{({ values }) => (
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
			            {props.surveyData.options.length > 0 &&
			          		props.surveyData.options.map((option, index) => (
				            <Grid.Row columns={2} key={`row-${index}`}>
					            <Grid.Column width={4} key={`column1-${index}`}>
						            <label 
						            	key={`label-${index}`} 
						            	htmlFor={`options.${index}.option`}
					            	>
					            		{option.option}
				            		</label>
				              </Grid.Column>
				              <Grid.Column width={12} key={`column2-${index}`}>
				                <Field fluid
				                	required
				                	key={`input-${index}`}
				                	min="0"
				                	max="10"
				                	as={Input}
				                  name={`options.${index}.option`}
				                  placeholder="0 ... 10"
				                  type="number"
				                />
				                <ErrorMessage
				                key={`error-${index}`}
				                name={`options.${index}.option`}
				                component="div"
				                className="field-error"
				              	/>
				            	</Grid.Column>
				            </Grid.Row> 
			            ))}
			        		<Grid.Row>
				            <Grid.Column>
				        			<Button size="large" className="float-right" type="submit">
				        				Submit your choices
			        				</Button>
				        		</Grid.Column>
			            </Grid.Row> 
			      		</Grid>
			        </FieldArray>
			    	</Form>
			  	</Container>
		  	)}
	  	</Formik>
		</React.Fragment>
	)
};

export default Survey;


Survey.propTypes = {
	surveyData: PropTypes.object,
	surveyTitle: PropTypes.string,
	createParticipantData: PropTypes.func,
};
