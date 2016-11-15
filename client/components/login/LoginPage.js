import React from "react";

import LoginForm from './LoginForm';

import { connect } from 'react-redux';


class LoginPage extends React.Component {
	render() {

		return (
			<div className="row">
				<div className="col-md-4 col-md-offset-4">
					<LoginForm />
				</div>
			</div>			
			)
		}
	}


export default connect(null, {})(LoginPage);