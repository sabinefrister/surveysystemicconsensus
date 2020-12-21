import React from 'react';
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import { Container, Segment, Button, Header, Input, Grid } from 'semantic-ui-react'
import { Form as UIForm } from 'semantic-ui-react'


const initialValues = {
	surveyTitle: '',
  options: [
    {
      option: '',
    },
  ],
};

const CreateSurvey = (props) => (
  <Grid>    
    <Header as='h1'>Create your Survey</Header>
    <Formik
      initialValues={initialValues}
      onSubmit={(createSurveyData) => {
        props.getCreateSurveyData(createSurveyData);
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="options">
            {({ remove, push }) => (
              <React.Fragment>
                <Grid.Row>
                  <Grid.Column>
                    <label htmlFor="surveyTitle">Survey Title</label>
                  	<Field 
                      id="surveyTitle" 
                      name="surveyTitle" 
                      placeholder="surveyTitle"
                    />
                  </Grid.Column>
                </Grid.Row>  
                {values.options.length > 0 &&
                values.options.map((option, index) => (
                  <Grid.Row>
                    <Grid.Column>
                      <label htmlFor={`options.${index}.option`}>Option {+(index+1)}</label>
                      <Field
                        name={`options.${index}.option`}
                        placeholder="Your Option"
                        type="text"
                      />
                      <ErrorMessage
                        name={`options.${index}.option`}
                        component="div"
                        className="field-error"
                      />
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Remove this option
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                ))} 
                <Button
                  type="button"
                  onClick={() => push({ option: ''})}
                >
                  Add another option
                </Button>
              </React.Fragment>
            )}
          </FieldArray>
          <Button type="submit">Create your survey</Button>
        </Form>
      )}
    </Formik>
  </Grid>
);

export default CreateSurvey;


CreateSurvey.propTypes = {
	getCreateSurveyData: PropTypes.func,
};
