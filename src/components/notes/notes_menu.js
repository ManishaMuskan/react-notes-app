import { useState } from "react";
import { BiSort } from "react-icons/bi";
import { FaList, FaThLarge } from "react-icons/fa";
import AppConstants from "../../constants/app_constants";

const NotesMenu = ({
	previewMode,
	setNotePreviewMode,
	sortingOptions,
	sortNotes,
}) => {
	const [activeOption, setActiveOption] = useState(sortingOptions[2].key);
	return (
		<div className='notes-list-menu'>
			<div className='menu-option'>
				<label>View type</label>
				<div className='toggle-view'>
					<FaList
						title='list view'
						onClick={() => {
							setNotePreviewMode(AppConstants.NOTE_PREVIEW_MODE_LIST);
						}}
						className={
							previewMode === AppConstants.NOTE_PREVIEW_MODE_LIST
								? "active"
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
								? "active"
								: ""
						}
					/>
				</div>
			</div>
			<div className='menu-option'>
				<label>Sort by</label>
				<div className='menu-option-wrapper'>
					<BiSort title='sort by' />
					<ul>
						{sortingOptions.map((opt, index) => {
							return (
								// todo: add sorting arrow icon after the title for the active li
								<li
									key={index}
									className={activeOption === opt.key ? "active" : ""}
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
