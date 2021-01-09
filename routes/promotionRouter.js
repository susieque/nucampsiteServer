const express = require('express');
const promotionRouter = express.Router();

//In the route method give a single arguement of a path '/' set up promotion path in server.js
//Single statement handles all the endpoints for routing to promotions.
promotionRouter
	.route('/')
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		next();
	})
	.get((req, res) => {
		res.end('Will send all the promotions to you');
	})
	.post((req, res) => {
		res.end(
			`Will add the promotion: ${req.body.name} with description: ${req.body.description}`
		);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /promotions');
	})
	.delete((req, res) => {
		res.end('Deleting all promotions');
	});

promotionRouter
	.route('/:promotionId')
	.all((req, res, next) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'plain/text');
		next();
	})
	.get((req, res) => {
		res.end('Will send all the promotions to you');
	})
	.post((req, res) => {
		res.end(
			`Will add the promotion: ${req.body.name} with description: ${req.body.description}`
		);
	})
	.put((req, res) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /promotions');
	})
	.delete((req, res) => {
		res.end('Deleting all promotions');
	});

module.exports = promotionRouter;
