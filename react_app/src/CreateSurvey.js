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
                      <label className="form-label" htmlFor="surveyTitle">Survey Title</label>
                    </Grid.Column>
                    <Grid.Column width={11}>
                    	<Field fluid
                        id="surveyTitle" 
                        as={Input}
                        name="surveyTitle" 
                        placeholder="surveyTitle"
                      /> 
                    </Grid.Column>
                    <Grid.Column width={1}>
                    </Grid.Column>
                  </Grid.Row>
                  {values.options.length > 0 &&
                  values.options.map((option, index) => (
                    <React.Fragment>
                      <Grid.Row columns={3}>
                        <Grid.Column width={4}>
                          <label 
                            className="form-label" 
                            htmlFor={`options.${index}.option`}>Option {+(index+1)}
                          </label>
                        </Grid.Column>
                        <Grid.Column width={11} >
                          <Field fluid
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
                        <Grid.Column width={1}>
                          <Button icon size="large"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <Icon name="close" />
                          </Button>
                        </Grid.Column>
                      </Grid.Row>
                    </React.Fragment>
                  ))} 
                  <Grid.Row>
                        <Grid.Column width={4}>
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <Button 
                            size="large"
                            type="submit"
                          >
                            Create your survey
                          </Button>
                        </Grid.Column>
                        <Grid.Column width={6} className="icon-button">
                          <Button
                            icon labelPosition='left'
                            size="large"
                            type="button"
                            onClick={() => push({ option: ''})}
                          >
                            <Icon name="plus" /> 
                            Add another option
                          </Button>
                        </Grid.Column>
                        <Grid.Column width={1}>
                        </Grid.Column>
                      </Grid.Row>
                </Grid>
              )}
            </FieldArray>
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
