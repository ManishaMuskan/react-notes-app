import React from "react";
import { FaTrash } from "react-icons/fa";

const NotePreview = ({ noteTitle, noteBody }) => {
	return (
		// if previewmode="detail-preview", show detail-preview
		<div className='notes-details-preview'>
			<div className='notes-header'>
				<FaTrash className='delete-notes' />
			</div>
			<div className='notes-content'>
				<h5>{noteTitle}</h5>
				<p>{noteBody}</p>
			</div>
			<span className='notes-footer'>edited 5 secs ago</span>
		</div>

		// else show list-preview with an icon and title
	);
};

export default NotePreview;
