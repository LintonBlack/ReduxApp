import React from "react";
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
//option A : import { browserHistory } from 'react-router';


//[1]//import axios from 'axios';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/signup';



class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username:'re',
			email:'re@er.fr',
			password:'qw',
			passwordConfirmation:'qw',
			timezone:'',
			errors:{},
			isLoading: false,
			isInvalid: false
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.checkUserExist = this.checkUserExist.bind(this);
		

	}

	checkUserExist(e) {
		const field = e.target.name;
		const val= e.target.value;

		if(val !== '') {
			this.props.isUserExists(val).then(res => {
				let errors = this.state.errors;
				let invalid;
				if (res.data.user) {
					errors[field] = ' There is user with such ' + field;
					invalid = true;
				} else {
					errors[field] = '';
					invalid = false;
				}

				this.setState({
					errors,
					isInvalid: invalid
				})
			})
		}

		
	}

	onChange(e) {
		this.setState({
			[e.target.name] : e.target.value
		})
	}

	isValid() {
		const {errors, isValid } = validateInput(this.state);

		if (!isValid) {
			this.setState({ errors, isLoading:false });
		}

		return isValid;
	}

	onSubmit(e) {
		e.preventDefault();
		//clear errors
		this.setState({ errors: {}, isLoading:true });

		if(this.isValid()) {
			this.props.userSignupRequest(this.state).then(
				//if success
				() => {
					
					// 2 options A use browserHistory
					//browserHistory.push('/');

					//B use context router					
					this.props.addFlashMessage({
						type:'succes',
						text:'you have signed up successfully, thanks.'
					});

					this.context.router.push('/');

				},
				//else
				({ data }) => this.setState({ errors: data, isLoading:false })
			);
		}

		//console.log(this.state);
		//[1]//axios.post('/api/users', {user:this.state})
		// axios version 0.12 npm install --save axios@0.12
		//# npm r --save axios
		// # npm i --save axios@0.12.0

		
	}

	render() {
		const { errors } = this.state;

		const options = map(timezones, (val, key) =>
			<option key={val} value={val}>{key}</option>
			);

		return (
			<form onSubmit={this.onSubmit}>
				<h1>Join our community</h1>
				<TextFieldGroup
						error = { errors.username }
						label="Username"
						value={this.state.username}						
						onChange={this.onChange}
						checkUserExist = {this.checkUserExist}						 
					 	field="username"
				/>			  	
				
				<TextFieldGroup
						error = { errors.email }
						label="Email"
						value={this.state.email}						
						onChange={this.onChange}
						checkUserExist = {this.checkUserExist}					 
					 	field="email"
				/>	
				<TextFieldGroup
						error = { errors.password }
						label="Password"
						value={this.state.password}	
						type="password"					
						onChange={this.onChange}					 
					 	field="password"
				/>
				<TextFieldGroup
						error = { errors.passwordConfirmation }
						label="Password Confirmation"
						value={this.state.passwordConfirmation}	
						type="password"					
						onChange={this.onChange}					 
					 	field="passwordConfirmation"
				/>
				<div className={classnames("form-group", { 'has-error': errors.timezone })}>
					<label className="control-label">Timezone</label>
					<select 
						value={this.state.timezone}						
						onChange={this.onChange}
					 	name="timezone"
					  	className="form-control">
					  	<option value="" disabled> Choose Your TimeZone</option>
					  	{options}
					</select>
					{ errors.timezone && <span className="help-block">{ errors.timezone }</span>}
				</div>
				<div className="form-group">
					<button disabled={this.state.isLoading || this.state.isInvalid} className="btn btn-primary btn-lg" >
						Sign up
					</button>
				</div>
			</form>			
			)
		}
	}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage : React.PropTypes.func.isRequired,
	isUserExists : React.PropTypes.func.isRequired
}

//context router 
SignupForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default SignupForm;