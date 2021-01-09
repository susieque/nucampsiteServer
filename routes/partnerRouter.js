const express = require('express');
const partnerRouter = express.Router();

//In the route method give a single arguement of a path '/' set up campsite path in server.js
//Single statement handles all the endpoints for routing to partner.
partnerRouter
	.route('/')
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		next();
	})
	.get((req, res) => {
		res.end('Will send all the partners to you');
	})
	.post((req, res) => {
		res.end(
			`Will add the partner: ${req.body.name} with description: ${req.body.description}`
		);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end(
			`Updating the partner: ${req.body.name} Will update the partner: ${req.body.description}`
		);
	})
	.delete((req, res) => {
		res.end('Deleting all partners');
	});

partnerRouter
	.route('/:partnerId')
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'plain/text');
		next();
	})
	.get((req, res) => {
		res.end('Will send all the partners to you');
	})
	.post((req, res) => {
		res.end(
			`Will add the partner: ${req.body.name} with description: ${req.body.description}`
		);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end(
			`Will update the partner: ${req.body.name} with description: ${req.body.description}`
		);
	})
	.delete((req, res) => {
		res.end('Deleting all partners');
	});

module.exports = partnerRouter;
