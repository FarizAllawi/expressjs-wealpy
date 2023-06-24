const express = require('express');
const router = express.Router();

const course = require('./course');
const courseCategory = require('./course-category')
const courseSection = require('./couse-section');
const courseVideo = require('./course-video');
const courseWatched = require('./course-watched');

// Route Course
router.get('/', course.get);
router.post('/', course.create);
router.put('/', course.update);
router.delete('/', course.destroy);

// // Route Course Category
router.get('/category', courseCategory.get);
router.post('/category', courseCategory.create);
router.delete('/category', courseCategory.destroy);

// Route Course Section
router.get('/section', courseSection.get);
router.post('/section', courseSection.create);
router.put('/section', courseSection.update);
router.delete('/section', courseSection.destroy);

// Route Course Video
router.get('/video', courseVideo.get);
router.post('/video', courseVideo.create);
router.put('/video', courseVideo.update);
router.delete('/video', courseVideo.destroy);

// Route Coure Watched Video
router.get('/watched', courseWatched.get);
router.post('/watched', courseWatched.create);
router.put('/watched', courseWatched.update);
router.delete('/watched', courseWatched.destroy);

module.exports = router;
