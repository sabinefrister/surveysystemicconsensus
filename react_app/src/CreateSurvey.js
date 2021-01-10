import React from 'react';
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import { Container, Segment, Button, Header, Input, Grid, Label } from 'semantic-ui-react'
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
  <React.Fragment>    
    <Grid.Row>
      <Header as='h1'>Create your Survey</Header>
    </Grid.Row>
    <Grid.Row>
      <Formik
        initialValues={initialValues}
        onSubmit={(surveyData) => {
          props.createSurvey(surveyData);
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="options">
              {({ remove, push }) => (
                <React.Fragment>
                  <Grid.Row>
                    <Label htmlFor="surveyTitle">Survey Title</Label>
                  	<Field 
                      id="surveyTitle" 
                      as={Input}
                      name="surveyTitle" 
                      placeholder="surveyTitle"
                    />
                  </Grid.Row>  
                  {values.options.length > 0 &&
                  values.options.map((option, index) => (
                    <Grid.Row>
                      <Label htmlFor={`options.${index}.option`}>Option {+(index+1)}</Label>
                      <Field
                        name={`options.${index}.option`}
                        as={Input}
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
    </Grid.Row>
  </React.Fragment>
);

export default CreateSurvey;


CreateSurvey.propTypes = {
	createSurvey: PropTypes.func,
};
