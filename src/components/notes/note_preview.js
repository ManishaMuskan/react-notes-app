import React from "react";
import { FaTrash } from "react-icons/fa";
import Moment from "react-moment";

const NotePreview = ({ note, activeNote, handleDeleteNote, activateNote }) => {
	const renderMoment = (note) => {
		if (!note.lastModified) {
			return (
				<>
					<span>added </span>
					<Moment fromNow>{note.createdDate}</Moment>
				</>
			);
		} else {
			return (
				<>
					<span>edited </span>
					<Moment fromNow>{note.lastModified}</Moment>
				</>
			);
		}
	};

	return (
		// if previewmode="detail-preview", show detail-preview
		<div
			className={`notes-details-preview ${
				activeNote.id === note.id ? `active` : ``
			}`}
			onClick={() => activateNote(note)}
		>
			<div className='notes-header'>
				<FaTrash
					className='delete-notes'
					onClick={(e) => {
						e.stopPropagation();
						handleDeleteNote(note.id);
					}}
				/>
			</div>
			<div className='notes-content'>
				<h5>{note.title}</h5>
				<p>{note.body}</p>
			</div>
			<span className='notes-footer'>{renderMoment(note)}</span>
		</div>

		// else show list-preview with an icon and title
	);
};

export default NotePreview;
