import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Formik, Field, Form } from 'formik';


class CreateSurvey extends Component {
	render() {
    return (
			<React.Fragment>
				<h2>Create your Survey</h2>
				<Formik
		      initialValues={{
		        option1: '',
		        option2: '',
		      }}
		      onSubmit={(values) => {
		        console.log(values)
		      }}
		    >
					<Form>
						<label htmlFor="option1">Option 1</label>
        		<Field id="option1" name="option1" placeholder="option" />
        		<label htmlFor="option2">Option 2</label>
        		<Field id="option2" name="option2" placeholder="option" />
		        <button type="submit">Submit</button>
					</Form>
				</Formik>
			</React.Fragment>
    );
  }
}

export default CreateSurvey;


CreateSurvey.propTypes = {
};
