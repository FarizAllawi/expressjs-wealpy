const express = require('express');
const router = express.Router();

const get = require('./get');
const create = require('./create');
const update = require('./update');
const destroy = require('./delete');

router.get('/', get);
router.post('/', create);
router.put('/', update);
router.delete('/', destroy);

module.exports = router;
