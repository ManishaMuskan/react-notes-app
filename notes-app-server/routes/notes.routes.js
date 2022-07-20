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

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const note = await Note.findById(id);
		return res.status(200).send({ note });
	} catch (e) {
		return res.status(400).send({ message: e.message });
	}
});

router.post('/', async (req, res) => {
	try {
		const {
			title, body, tags,
		} = req.body;
		const note = new Note({
			title, body, tags,
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
		if (!note) {
			return res.status(404).send({ message: `No note found with id ${id}` });
		}
		return res.status(200).send({ message: `Note with id ${id} deleted!` });
	} catch (e) {
		return res.status(400).send({ message: e.message });
	}
});

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { title, body, tags } = req.body;
		const note = await Note.findById(id);
		if (!note) {
			return res.status(404).send({ message: `No note found with id ${id}` });
		}
		note.title = title;
		note.body = body;
		note.tags = tags;
		note.lastModified = new Date();
		await note.save();
		return res.status(200).send({ note });
	} catch (e) {
		return res.status(400).send({ message: e.message });
	}
});

module.exports = router;
