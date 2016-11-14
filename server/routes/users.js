import express from 'express';
import validateInput from '../shared/validations/signup';

let router = express.Router();

router.post('/', (req,res) => {
	//simulate setTimeout
	/*setTimeout(() => {
		const { errors, isValid } = validateInput(req.body);

		if (!isValid) {
			res.status(400).json(errors);
		}
	}, 5000)*/

	const { errors, isValid } = validateInput(req.body);

	if (isValid)  {
		res.json().json({succes: true});
	} else {
		res.status(400).json(errors);
	}
	
})

export default router;