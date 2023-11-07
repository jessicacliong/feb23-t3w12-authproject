const express = require('express');

// make a server instance 
const app = express();

// Enables request.body to be raw JSON data 
// IMportant, don't forget to add this!
app.use(express.json());

app.get("/", (request, response) => {
	response.json({
		message:"Hello world"
	});
});

const userController = require('./controllers/UserController');
app.use("uses", userController);

module.exports = {
	app
}