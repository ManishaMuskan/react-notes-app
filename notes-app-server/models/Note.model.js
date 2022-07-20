/* eslint-disable no-param-reassign */
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
		default: new Date(),
	},
	lastModified: {
		type: Date,
		default: new Date(),
	},
});

noteSchema.set('toJSON', {
	transform(document, returnedObject) {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Note = mongoose.model('Notes', noteSchema);
module.exports = Note;
