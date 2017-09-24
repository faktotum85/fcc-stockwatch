var express = require('express');
var router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stockwatch' });
});

module.exports = router;
