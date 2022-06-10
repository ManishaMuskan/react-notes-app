import React from "react";
import { FaTrash } from "react-icons/fa";

const NotePreview = ({ note, classActive, handleDeleteNote }) => {
	return (
		// if previewmode="detail-preview", show detail-preview
		<div
			className={`notes-details-preview ${classActive}`}
			onClick={() => {
				console.log("selected");
			}}
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
			<span className='notes-footer'>edited 5 secs ago</span>
		</div>

		// else show list-preview with an icon and title
	);
};

export default NotePreview;
