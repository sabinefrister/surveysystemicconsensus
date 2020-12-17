import React from 'react';
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import { Container, Segment, Button, Header, Input } from 'semantic-ui-react'
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
        props.getCreateSurveyData(surveyData)
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="options">
            {({ insert, remove, push }) => (
              <div>
                <label htmlFor="surveyTitle">Survey Title</label>
              	<Field 
                  id="surveyTitle" 
                  name="surveyTitle" 
                  placeholder="surveyTitle"
                  component={Input}
                />
                {values.options.length > 0 &&
                  values.options.map((option, index) => (
                    <React.Fragment>
                      <label htmlFor={`options.${index}.option`}>Option {+(index+1)}</label>
                      <Field
                        name={`options.${index}.option`}
                        placeholder="Your Option"
                        type="text"
                        component={Input}
                      />
                      <ErrorMessage
                        name={`options.${index}.option`}
                        component="div"
                        className="field-error"
                      />
                      <Button
                        type="button"
                        className="secondary"
                        onClick={() => remove(index)}
                      >
                        X
                      </Button>
                    </React.Fragment>
                  ))}
                <Button
                  type="button"
                  className="secondary"
                  onClick={() => push({ option: ''})}
                >
                  Add another Option
                </Button>
              </div>
            )}
          </FieldArray>
          <Button type="submit">Create your survey</Button>
        </Form>
      )}
    </Formik>
  </React.Fragment>
);

export default CreateSurvey;


CreateSurvey.propTypes = {
	getCreateSurveyData: PropTypes.func,
};
