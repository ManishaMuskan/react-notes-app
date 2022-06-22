import { useEffect } from "react";
import { FaTags } from "react-icons/fa";

const TagNotes = ({
	childTagInputRef: tagInputRef, // Reffering to the reference taken from parent component giving alias tagInputRef
	tagsList,
	addTag,
	removeTag,
	focusTagInput,
	setFocusOnTagInput,
}) => {
	useEffect(() => {
		focusTagInput && tagInputRef.current.focus();
	}, [focusTagInput, tagInputRef]);

	const focusAddTagInput = () => {
		setFocusOnTagInput(true);
	};

	const _addTag = (e) => {
		if (e.key === "Enter" && e.target.value.trim()) {
			addTag(e.target.value);
			tagInputRef.current.value = null;
		}
	};

	let tags = tagsList.map((tag, index) => {
		return (
			<div className='tag' key={index}>
				<span className='tag-name'>{tag}</span>
				<span
					className='cancel-tag'
					onClick={() => {
						removeTag(index);
					}}
				>
					&times;
				</span>
			</div>
		);
	});
	if (!focusTagInput && !tagsList.length) {
		return (
			<button className='add-tag' onClick={focusAddTagInput}>
				<FaTags className='tags-icon' />
				Add tag and press Enter
			</button>
		);
	} else {
		return (
			<>
				<h5 className='tags-label'>Tags</h5>
				<div className='tags-wrapper' onClick={focusAddTagInput}>
					{tags}
					<input
						ref={tagInputRef}
						type='text'
						className='new-tag'
						onKeyDown={_addTag}
					/>
				</div>
			</>
		);
	}
};

export default TagNotes;
