import { useState } from "react";
import { BiSort } from "react-icons/bi";
import { FaList, FaThLarge } from "react-icons/fa";
import AppConstants from "../../constants/app_constants";
import Classes from "./notes.module.css";

const NotesMenu = ({
	previewMode,
	setNotePreviewMode,
	sortingOptions,
	sortNotes,
}) => {
	const [activeOption, setActiveOption] = useState(sortingOptions[2].key);
	return (
		<div className={Classes["notes-list-menu"]}>
			<div className={Classes["menu-option"]}>
				<label>View type</label>
				<div className={Classes["toggle-view"]}>
					<FaList
						title='list view'
						onClick={() => {
							setNotePreviewMode(AppConstants.NOTE_PREVIEW_MODE_LIST);
						}}
						className={
							previewMode === AppConstants.NOTE_PREVIEW_MODE_LIST
								? Classes.active
								: ""
						}
					/>
					<FaThLarge
						title='grid view'
						onClick={() => {
							setNotePreviewMode(AppConstants.NOTE_PREVIEW_MODE_GRID);
						}}
						className={
							previewMode === AppConstants.NOTE_PREVIEW_MODE_GRID
								? Classes.active
								: ""
						}
					/>
				</div>
			</div>
			<div className={Classes["menu-option"]}>
				<label>Sort by</label>
				<div className={Classes["menu-option-wrapper"]}>
					<BiSort title='sort by' />
					<ul>
						{sortingOptions.map((opt, index) => {
							return (
								// todo: add sorting arrow icon after the title for the active li
								<li
									key={index}
									className={activeOption === opt.key ? Classes.active : ""}
									onClick={() => {
										setActiveOption(opt.key);
										sortNotes(opt.key, opt.sortingOrder);
									}}
								>
									{opt.text}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default NotesMenu;
