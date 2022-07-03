/* eslint-disable func-names */
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
	},
	body: {
		type: String,
		trim: true,
	},
	tags: {
		type: [String],
	},
	createdDate: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	lastModified: {
		type: Date,
	},
});

const Note = mongoose.model('Notes', noteSchema);
module.exports = Note;
