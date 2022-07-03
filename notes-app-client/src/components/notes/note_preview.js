import React from "react";
import { FaTags, FaTrash } from "react-icons/fa";
import Moment from "react-moment";
import AppConstants from "../../constants/app_constants";
import Classes from "./notes.module.css";

const NotePreview = ({
	note,
	activeNote,
	handleDeleteNote,
	activateNote,
	showAlert,
	previewMode,
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

	const gridModePreview = () => {
		return (
			<div
				className={`${Classes["notes-details-preview"]} ${
					activeNote.id === note.id ? `${Classes.active}` : ``
				}`}
				onClick={() => activateNote(note)}
			>
				<div className={Classes["notes-header"]}>
					<FaTrash
						className={Classes["delete-notes"]}
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
				<div className={Classes["notes-content"]}>
					<h5>{note.title}</h5>
					<p>{note.body}</p>
				</div>
				<div className={Classes["notes-footer"]}>
					{note.tags.length > 0 && (
						<div className={Classes["note-tags"]}>
							<i>
								<FaTags className={Classes["tags-icon"]} />
							</i>
							<span>{tags(note.tags)}</span>
						</div>
					)}
					<span className={Classes["note-timing"]}>{renderMoment(note)}</span>
				</div>
			</div>
		);
	};

	const listModePreview = () => {
		return (
			<div
				className={`${Classes["notes-list-preview"]} ${
					activeNote.id === note.id ? `${Classes.active}` : ``
				}`}
				onClick={() => activateNote(note)}
			>
				<p className={Classes["notes-content"]}>{note.title}</p>
				<FaTrash
					className={Classes["delete-notes"]}
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
		);
	};

	if (previewMode === AppConstants.NOTE_PREVIEW_MODE_GRID) {
		return gridModePreview();
	} else {
		return listModePreview();
	}
};

export default NotePreview;
