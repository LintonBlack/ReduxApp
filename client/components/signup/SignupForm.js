import React from "react";
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
//[1]//import axios from 'axios';



class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username:'',
			email:'',
			password:'',
			passwordConfirmation:'',
			timeZone:'',
			errors:{},
			isLoading: false
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

	}

	onChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	onSubmit(e) {
		e.preventDefault();
		//clear errors
		this.setState({ errors: {}, isLoading:true });

		//console.log(this.state);
		//[1]//axios.post('/api/users', {user:this.state})
		// axios version 0.12 npm install --save axios@0.12
		//# npm r --save axios
		// # npm i --save axios@0.12.0

		this.props.userSignupRequest(this.state).then(
			() => {},
			({ data }) => this.setState({ errors: data, isLoading:false })
		);
	}

	render() {
		const { errors } = this.state;

		const options = map(timezones, (val, key) =>
			<option key={val} value={val}>{key}</option>
			);

		return (
			<form onSubmit={this.onSubmit}>
				<h1>Join our community</h1>
				<div className={classnames("form-group", { 'has-error': errors.username })}>
					<label className="control-label">Username</label>
					<input 
						value={this.state.username}
						type="text"
						onChange={this.onChange}
					 	name="username"
					  	className="form-control" />
					  	{ errors.username && <span className="help-block">{ errors.username }</span> }
				</div>
				<div className={classnames("form-group", { 'has-error': errors.email })}>
					<label className="control-label">Email</label>
					<input 
						value={this.state.email}
						type="text"
						onChange={this.onChange}
					 	name="email"
					  	className="form-control" />
					  	{ errors.email && <span className="help-block">{ errors.email }</span> }
				</div>
				<div className={classnames("form-group", { 'has-error': errors.password })}>
					<label className="control-label">Password</label>
					<input 
						value={this.state.password}
						type="password"
						onChange={this.onChange}
					 	name="password"
					  	className="form-control" />
					  	{ errors.password && <span className="help-block">{ errors.password }</span>}
				</div>
				<div className={classnames("form-group", { 'has-error': errors.passwordConfirmation })}>
					<label className="control-label">Password Confirmation</label>
					<input 
						value={this.state.passwordConfirmation}
						type="password"
						onChange={this.onChange}
					 	name="passwordConfirmation"
					  	className="form-control" />
					  	{ errors.passwordConfirmation && <span className="help-block">{ errors.passwordConfirmation }</span>}
				</div>
				<div className={classnames("form-group", { 'has-error': errors.timeZone })}>
					<label className="control-label">Timezone</label>
					<select 
						value={this.state.timeZone}						
						onChange={this.onChange}
					 	name="timeZone"
					  	className="form-control">
					  	<option value="" disabled> Choose Your TimeZone</option>
					  	{options}
					</select>
					{ errors.timeZone && <span className="help-block">{ errors.timeZone }</span>}
				</div>
				<div className="form-group">
					<button disabled={this.state.isLoading} className="btn btn-primary btn-lg" >
						Sign up
					</button>
				</div>
			</form>			
			)
		}
	}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;