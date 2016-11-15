import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcryptjs';
/*Bad approach returning 2 promises import Promise from 'bluebird';*/
import isEmpty from 'lodash/isEmpty';

import User from '../models/user';


let router = express.Router();

function validateInput(data, otherValidations) {
	let { errors } = otherValidations(data);
 /*Right approach*/
 return User.query({
 	where: { email: data.email},
 	orWhere: { username: data.username}
 }).fetch().then(user => {
 	if (user) {
 		if (user.get('username') === data.username) { 
 			errors.username = 'There is user with such username';
 		}

 		if (user.get('email') === data.email) { 
 			errors.email = 'There is user with such email';
 		}
 	}

 	//then return errors
 	return {
				errors,
				isValide: isEmpty(errors)
			}
 })

 /* Bad approach returning 2 promises
	return Promise.all([
		User.where({ email:data.email}).fetch().then(user => {
				if (user) { errors.email = 'There is user with such email'}
			}),
		User.where({ username:data.username}).fetch().then(user => {
				if (user) { errors.username = 'There is user with such username'}
			})
		]).then(() => {
			return {
				errors,
				isValide: isEmpty(errors)
			}
		})
		*/
	



	
}
//commonValidations

router.post('/', (req,res) => {

	validateInput(req.body, commonValidations).then(({ errors, isValid}) => {
		if (isValid) {
		      const { username, password, timezone, email } = req.body;
		      const password_digest = bcrypt.hashSync(password, 10);

		      User.forge({
		        username, timezone, email, password_digest
		      }, { hasTimestamps: true }).save()
		        .then(user => res.json({ success: true }))
		        .catch(err => res.status(500).json({ error: err }));

		    } else {
				res.status(400).json(errors);
			}
	});


	
})

export default router;