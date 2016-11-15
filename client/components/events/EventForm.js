import React from "react";
import { connect } from 'react-redux';
import { createEvent } from '../../actions/eventActions';
import TextFieldGroup from '../common/TextFieldGroup';

class EventForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			title:'',
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
		this.props.createEvent(this.state);

	}
	render() {	
		const { errors, title, isLoading } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				<TextFieldGroup
						field="title"						
						label="Event Title"
						value={this.state.title}	
						error = { errors.title }					
						onChange={this.onChange}			 
				/>	
			
				<div className="form-group">
					<button disabled={this.state.isLoading} className="btn btn-primary btn-lg" >
						Create New Event
					</button>
				</div>
			</form>		
			)
		}
	}

EventForm.propType = {
	createEvent: React.PropTypes.func.isRequired
}

export default connect(null, { createEvent })(EventForm);