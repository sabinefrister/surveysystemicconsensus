import React from 'react';
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import { Container, Segment, Icon, Button, Header, Input, Grid, Label } from 'semantic-ui-react'
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
      <Header as='h1'>Create your Survey</Header>
      <Formik
        initialValues={initialValues}
        onSubmit={(surveyData) => {
          props.createSurvey(surveyData);
        }}
      >
        {({ values }) => (
          <Container text>
            <Form>
              <FieldArray name="options">
                {({ remove, push }) => (
                  <Grid>
                    <Grid.Row columns={3}>
                      <Grid.Column width={4}>
                        <label htmlFor="surveyTitle">Survey Title</label>
                      </Grid.Column>
                      <Grid.Column width={8}>
                      	<Field 
                          id="surveyTitle" 
                          as={Input}
                          name="surveyTitle" 
                          placeholder="surveyTitle"
                        /> 
                      </Grid.Column>
                    </Grid.Row>
                    {values.options.length > 0 &&
                    values.options.map((option, index) => (
                      <Grid.Row columns={3}>
                        <Grid.Column width={4}>
                          <label htmlFor={`options.${index}.option`}>Option {+(index+1)}</label>
                        </Grid.Column>
                        <Grid.Column width={8}>
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
                        </Grid.Column>
                        <Grid.Column width={4}>
                          <Button icon labelPosition='left'
                            type="button"
                            onClick={() => remove(index)}
                          >
                            Add
                            <Icon name="plus" />
                          </Button>
                          <Button icon labelPosition='left'
                            type="button"
                            onClick={() => push({ option: ''})}
                          >
                            Remove
                            <Icon name="close" />
                          </Button>
                        </Grid.Column>
                      </Grid.Row>
                    ))} 
                  </Grid>
                )}
              </FieldArray>
              <Button type="submit" id="create-button">Create your survey</Button>
            </Form>
          </Container>
        )}
      </Formik>
  </React.Fragment>
);

export default CreateSurvey;


CreateSurvey.propTypes = {
	createSurvey: PropTypes.func,
};
