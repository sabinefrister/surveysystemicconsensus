import React from 'react';
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import { Container, Icon, Button, Header, Input, Grid } from 'semantic-ui-react'


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
                    <Grid.Column width={10}>
                    	<Field fluid
                        required
                        id="surveyTitle" 
                        as={Input}
                        name="surveyTitle" 
                        placeholder="surveyTitle"
                      /> 
                    </Grid.Column>
                    <Grid.Column width={2}>
                    </Grid.Column>
                  </Grid.Row>
                  {values.options.length > 0 &&
                  values.options.map((option, index) => (
                    <React.Fragment key={`fragment-${index}`}>
                      <Grid.Row columns={3} key={`row-${index}`}>
                        <Grid.Column width={4} key={`column1-${index}`}>
                          <label 
                            key={`label-${index}`}
                            htmlFor={`options.${index}.option`}>Option {+(index+1)}
                          </label>
                        </Grid.Column>
                        <Grid.Column width={10} key={`column2-${index}`}>
                          <Field fluid
                            required
                            key={`input-${index}`}
                            name={`options.${index}.option`}
                            as={Input}
                            placeholder="Your Option"
                            type="text"
                          />
                          <ErrorMessage
                            key={`error-${index}`}
                            name={`options.${index}.option`}
                            component="div"
                            className="field-error"
                          />
                        </Grid.Column>
                        <Grid.Column width={2} key={`column3-${index}`}>
                          <Button icon 
                            key={`button-${index}`}
                            size="large"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <Icon name="trash alternate" key={`icon-${index}`}/>
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
                        className="float-right"
                        icon labelPosition='left'
                        size="large"
                        type="button"
                        onClick={() => push({ option: ''})}
                      >
                        <Icon name="plus" /> 
                        Add another Option
                      </Button>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <Button 
                        size="large"
                        type="submit"
                      >
                        Create your Survey
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
