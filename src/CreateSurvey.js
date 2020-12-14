import React from 'react';
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

const initialValues = {
  options: [
    {
      option: '',
    },
  ],
};

const CreateSurvey = () => (
  <React.Fragment>
    <h1>Create your Survey</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="options">
            {({ insert, remove, push }) => (
              <div>
                {values.options.length > 0 &&
                  values.options.map((option, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`options.${index}.option`}>Option {+index}</label>
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
};
