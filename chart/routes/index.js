'use strict';

const express = require('express');
const router = express.Router();
const genData = require('../models/generate-data')
const ip = require('ip')
const setting = require('../appsettings.json')

router.get('/graphdata', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:${setting.port_front}`)
  genData().then(data => {res.json(data)});
});

module.exports = router;
