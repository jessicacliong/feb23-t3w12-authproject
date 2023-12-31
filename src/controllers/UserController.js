// Import Express Library
const express = require('express');
const { User } = require('../models/UserModel');
const { comparePassword } = require('../functions/userAuthFunctions');


// mkae an instance of a Router
const router = express.Router();


// Customise the router instance

// GET localhost:3000/users/
// Expect a response of ALL users in DB: 
/*
	[
		{
			id:
			username:
			whateverOtherUserData: 
		},
		{
			id:
			username:
			whateverOtherUserData: 
		},
		{
			id:
			username:
			whateverOtherUserData: 
		}
	]
*/
router.get("/", async (request, response) => {
	let result = await User.find({});

	response.json({result});
})

// GET localhost:3000/users/laijsdfoiawecioawecoij
router.get("/id", async (request, response) => {
	let result = await User.findOne({_id: request.params.id});

	response.json({result});
})

// POST localhost:3000/users/
router.get("/id", async (request, response) => {
	let newUser = await User.create(request.body).catch(error => error);

	response.json(newUser);
})

// POST localhost:3000/users/login
// request.body = {username: "admin", password: "Password1"}
// respond with {jwt:"aciuhwejnasdiuhawecuaciuh"}
router.post("/login", async (request, response) => {
	// Find user by provided username 
	let targetUser = await User.findOne({username: request.body.username}).catch(error => error);

	// Check if user provided the correct password
	let isPasswordCorrect = await comparePassword(request.body.password, targetUser.password);

	if (!isPasswordCorrect) {
		response.status(403).json({error:"You are not authorised to do this!"});
	}

	// If they provided the correct, generate a JWT
	let freshJwt = generateJwt(targetUser._id.tostring());

	// respond with the JWT 
	respond.json({
		jwt: freshJwt
	});

});

// POST localhost:3000/users/verify
// JWT in request.headers["jwt"] or request.headers["authorization"]
// respond with {jwt:"aciuhwejnasdiuhawecuaciuh", valid: true}
router.get("/verify", async (request, response) => {

})

// GET localhost:3000/users/regenerate
// JWT in request.headers["jwt"] or request.headers["authorization"]
// respond with {jwt:"aciuhwejnasdiuhawecuaciuh"}
router.post("/regenerate", async (request, response) => {

})

module.exports = router;