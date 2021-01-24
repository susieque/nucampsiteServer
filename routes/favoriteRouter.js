const express = require('express');
const bodyParser = require('body-parser'); //DO WE STILL NEED THIS?
const Favorite = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');
const favorite = require('../models/favorite');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter
	.route('/')
	.options(cors.corsWithOptions, (req, res) => sendStatus(200))
	.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
		Favorite.find({ user: req.user._id })
			.populate('user')
			.populate('campsites')
			.then((favorites) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(favorites);
			})
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
		Favorite.findOne({ user: req.user._id }).then((favorite) => {
			if (favorite) {
				req.body.forEach((element) => {
					if (!favorite.campsites.includes(element._id)) {
						favorite.campsites.push(element);
					}
				});
				favorite.save().then((favorite) => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(favorite);
				});
			} else {
				const fave = new Favorite({
					user: req.user._id,
					campsites: req.body._id
				});
				fave.save((err) => {
					if (err) {
						res.statusCode = 500;
						res.setHeader('Content-Type', 'application/json');
						res.json({ err: err });
						return;
					}
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(favorite);
				});
			}
		});
	})
	.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
		res.sendStatus = 403;
		res.setHeader('Content-Type', 'text-plain');
		res.end('Put request not supported');
	})

	.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
		Favorite.findOneAndDelete({ user: req.user._id }).then((fave) => {
			if (fave) {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(fave);
			} else {
				res.setHeader('Content-Type', 'text-plain');
				res.end('You do not have any favorites to delete');
			}
		});
	});

favoriteRouter
	.route('/:campsiteId')
	.options(cors.corsWithOptions, authenticate.verifyUser, (req, res) =>
		res.sendStatus(200)
	)
	.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
		res.sendStatus = 403;
		res.setHeader('Content-Type', 'text-plain');
		res.end('Get request to /:campsiteId is not supported.');
	})
	.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
		Favorite.findOne({ user: req.user._id }).then((favorite) => {
			if (favorite) {
				if (favorite.campsites.includes(req.params.campsiteId)) {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'text-plain');
					res.end('This campsite is in the favorites list already.');
				} else {
					favorite.campsites.push(req.params.campsiteId);
					favorite.save().then((favorite) => {
						res.statusCode = 200;
						res.setHeader('Content-Type', 'application/json');
						res.json(favorite);
					});
				}
			} else {
				Favorite.create({
					user: req.user._id,
					campsites: req.params.campsiteId
				}).then((favorite) => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(favorite);
				});
			}
		});
	})

	.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
		res.sendStatus = 403;
		res.setHeader('Content-Type', 'text-plain');
		res.end('Put request to /:campsiteId is not supported.');
	})
	.delete(
		cors.corsWithOptions,
		authenticate.verifyUser,
        (req, res, next) => {
        Favorite.findOne({user: req.user._id}).then((favorite) => {
            if (favorite) {
                if(favorite.campsites.includes(req.params.campsiteId)){
          favorite.campsites.splice(favorite.campsites.indexOf(req.params.campsiteId, 1))
            } else {
                res.statusCode = 400;
                res.setHeader ('Content-Type', 'text-plain');
                res.end("This campsite isn't in your favorite document")
            }
          favorite.save()
          .then((favorite) => {
              res.statusCode = 200;
              res.setHeader ("Content-Type", "application/json");
              res.json(favorite);
          })
            } else {
                res.setHeader('Content-Type', 'text-plain');
                res.end("There is no favorite document to delete")
            }
        });
    }
);

module.exports = favoriteRouter;
