import { useEffect } from "react";
import { FaTags } from "react-icons/fa";
import Classes from "./tags.module.css";

const TagNotes = ({
	childTagInputRef: tagInputRef, // Reffering to the reference taken from parent component giving alias tagInputRef
	tagsList,
	addTag,
	removeTag,
	focusTagInput,
	setFocusOnTagInput,
}) => {
	useEffect(() => {
		if (focusTagInput) {
			tagInputRef.current.focus();
		}
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
			<div className={Classes["tag"]} key={index}>
				<span className={Classes["tag-name"]}>{tag}</span>
				<span
					className={Classes["cancel-tag"]}
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
			<button className={Classes["add-tag"]} onClick={focusAddTagInput}>
				<FaTags className={Classes["tags-icon"]} />
				Add tag and press Enter
			</button>
		);
	} else {
		return (
			<>
				<h5 className={Classes["tags-label"]}>Tags</h5>
				<div className={Classes["tags-wrapper"]} onClick={focusAddTagInput}>
					{tags}
					<input
						ref={tagInputRef}
						type='text'
						className={Classes["new-tag"]}
						onKeyDown={_addTag}
					/>
				</div>
			</>
		);
	}
};

export default TagNotes;
