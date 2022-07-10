'use strict';

const express = require('express');
const router = express.Router();
const genData = require('../models/generate-data');
const config = require('../config')

router.get('/graphdata', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', `http://${config.host}:${config.port_front}`);
  res.setHeader('Access-Control-Allow-Origin', `http://${config.host}`);
  genData().then(data => {res.json(data)});
});

module.exports = router;
