const router = require('express').Router();
const Note = require('../models/Note.model');

router.get('/', async (req, res) => {
	try {
		const notes = await Note.find();
		return res.status(200).send({ notes });
	} catch (e) {
		return res.status(400).send({ message: e.message });
	}
});

router.post('/', async (req, res) => {
	try {
		const {
			title, body, tags, createdDate, lastModified,
		} = req.body;
		const note = new Note({
			title, body, tags, createdDate, lastModified,
		});
		await note.save();
		return res.status(201).send({ note });
	} catch (e) {
		return res.status(400).send({ message: e.message });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const note = await Note.findByIdAndRemove(id);
		return res.status(200).send({ note });
	} catch (e) {
		return res.status(400).send({ message: e.message });
	}
});

module.exports = router;
