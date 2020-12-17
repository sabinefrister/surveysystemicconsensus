import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'



class Results extends Component {
	render() {
    return (
			<div>
				<Header as='h2'>Results of the Survey</Header>
			</div>
    );
  }
}

export default Results;


Results.propTypes = {
};
