const express = require('express');
const router = express.Router();

const get = require('./get');
const upload = require('./upload');
const destroy = require('./delete');

router.get('/', get);
router.post('/', upload);
router.delete('/', destroy);

module.exports = router;
