const app = require('../../app');
const router = require('express').Router();
const IndexController = require('../controllers/index');

router.route('/').get(IndexController.index);

app.use('/', router);