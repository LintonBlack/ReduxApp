import React from "react";
import { Link } from "react-router";

import { logout } from '../actions/authActions'

import { connect } from "react-redux";

class NavigationBar extends React.Component {


	logout(e) {
		e.preventDefault();
		this.props.logout();
	}

	render() {
		const { isAuthenticated } = this.props.auth;

		const userLinks = (
			<ul className="nav navbar-nav navbar-right">
				<li><Link to="/new-event" className="navbar-brand">Add New Event</Link> </li>  
				<li><a href="#" className="navbar-brand" onClick={this.logout.bind(this)}>Logout</a></li>
			</ul>  
		)

		const guestLinks = (
			<ul className="nav navbar-nav navbar-right">
				<li><Link to="/signup" className="navbar-brand">Sign up</Link> </li> 
				<li><Link to="/login" className="navbar-brand">Login</Link></li>    
			</ul>  
		)

		return (
				<nav className="navbar navbar-default">
  					<div className="container-fluid">
    					<div className="navbar-header">
    						<Link to="/" className="navbar-brand">Home</Link>     						
    					</div>
    					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      						{ isAuthenticated  ?   userLinks   :  guestLinks }
				    	</div>
				  	</div>
				</nav>
			)
		}
	}

NavigationBar.propTypes = {
	auth : React.PropTypes.object.isRequired,
	logout : React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps, { logout })(NavigationBar);