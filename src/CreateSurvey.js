import React from 'react';
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

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
    <h1>Create your Survey</h1>
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
              	<Field id="surveyTitle" name="surveyTitle" placeholder="surveyTitle" />
                {values.options.length > 0 &&
                  values.options.map((option, index) => (
                    <div className="row" key={index}>
                      <div className="col">
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
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ option: ''})}
                >
                  Add another Option
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Create your survey</button>
        </Form>
      )}
    </Formik>
  </React.Fragment>
);

export default CreateSurvey;


CreateSurvey.propTypes = {
	getCreateSurveyData: PropTypes.func,
};
