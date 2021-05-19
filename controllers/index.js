const User = require('../models/user');
const passport = require('passport');

module.exports = {
	// POST /register
	async postRegister(req, res, next) {
		try{
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			image: req.body.image
		});
		console.log(newUser);

		await User.register(newUser, req.body.password);
		res.redirect('/');
	}catch(e){
			res.status(400).send({error:e.message});
		}
	},
	// POST /login
	postLogin(req, res, next) {
		passport.authenticate('local', {
		  successRedirect: '/',
		  failureRedirect: '/login' 
		})(req, res, next);
	},
	// GET /logout
	getLogout(req, res, next) {
	  req.logout();
	  res.redirect('/');
	}
}