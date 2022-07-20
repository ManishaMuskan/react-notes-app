const router = require('express').Router();
const jsonParser = require('express').json();
const notesRoutes = require('./notes.routes');

router.use(jsonParser);
router.use('/notes', notesRoutes);

module.exports = router;
