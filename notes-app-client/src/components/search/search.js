import Classes from "./search.module.css";
const Search = ({ searchText, handleSearchOnChange, clearSearch }) => {
	return (
		<div className={Classes["search-wrapper"]}>
			<input
				className={Classes["search-input"]}
				placeholder='Search...'
				value={searchText}
				onChange={handleSearchOnChange}
			/>
			<span className={Classes["clear-search"]} onClick={clearSearch}>
				&times;
			</span>
		</div>
	);
};

export default Search;
