import express from 'express';
import authenticate from '../middlewares/authenticate';

//need to add authenticate middleware everytime I want to protect stuff
let router = express.Router();


router.post('/', authenticate, (req,res) => {
	res.status(201).json({ success: true});
	//res.status(201).json({ user: req.currentUser });	
})

export default router;