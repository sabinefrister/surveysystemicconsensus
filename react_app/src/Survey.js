import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Grid, Header, Button } from 'semantic-ui-react'
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
			<Grid>
				<Header as='h1'>Join this Survey</Header>
				<p>Here is your link to this survey: <a>https://www.yoursurvey.com</a></p>
				<Header as='h2'>{data.surveyTitle}</Header>
    		<Formik
    			initialValues={initialValues}
		      onSubmit={(surveyData) => {
		        this.props.getParticipantData(surveyData)
		      }}
		    >
			    	<Form>
				    	<FieldArray name="options">
	              <React.Fragment>
						    	<Grid.Row>
				            <Grid.Column>
			                <label htmlFor="name">Name</label>
					    				<Field 
					              id="name" 
					              name="name" 
					              placeholder="name"
					            />
				            </Grid.Column>
			            </Grid.Row> 
			            {data.options.length > 0 &&
                		data.options.map((option, index) => (
			            <Grid.Row>
				            <Grid.Column>
					            <label htmlFor={`options.${index}.option`}>{option.option}</label>
                      <Field
                        name={`options.${index}.option`}
                        placeholder="1 ... 10"
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
				        	<Button type="submit">Submit your choices</Button>
		        		</React.Fragment>
		          </FieldArray>
			    	</Form>

      	</Formik>
			</Grid>
    );
  }
}

export default Survey;


Survey.propTypes = {
	surveyData: PropTypes.object,
	getParticipantData: PropTypes.func,
};
