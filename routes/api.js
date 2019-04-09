var express = require('express');
var router = express.Router();
var userFacade = require('../facades/userFacade');
var loginFacade = require('../facades/loginFacade');

router.post('/login', async function(req, res, next) {
	const { userName, password, longitude, latitude, distance } = req.body;
	res.json(await loginFacade.login(userName, password, longitude, latitude, distance));
	next();
});
