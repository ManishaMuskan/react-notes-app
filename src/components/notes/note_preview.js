import React from "react";
import { FaTrash, FaTags } from "react-icons/fa";
import Moment from "react-moment";

const NotePreview = ({
	note,
	activeNote,
	handleDeleteNote,
	activateNote,
	showAlert,
}) => {
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

	const tags = (tags) => {
		return tags.join(" | ");
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
						showAlert({
							alertType: "success",
							message: "Note has been successfully deleted!",
						});
					}}
				/>
			</div>
			<div className='notes-content'>
				<h5>{note.title}</h5>
				<p>{note.body}</p>
			</div>
			<div className='notes-footer'>
				{note.tags.length > 0 && (
					<div className='note-tags'>
						<i>
							<FaTags className='tags-icon' />
						</i>
						<span>{tags(note.tags)}</span>
					</div>
				)}
				<span className='note-timing'>{renderMoment(note)}</span>
			</div>
		</div>

		// else show list-preview with an icon and title
	);
};

export default NotePreview;
