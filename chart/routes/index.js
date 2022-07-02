'use strict';

const express = require('express');
const router = express.Router();
const genData = require('../models/generate-data')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'SpeedTest' });
});

router.get('/graphdata', function (req, res, next) {
  genData().then(data => {res.json(data)});
});

module.exports = router;
