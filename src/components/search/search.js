const Search = ({ searchText, handleSearchOnChange, clearSearch }) => {
	return (
		<div className='search-wrapper'>
			<input
				className='search-input'
				placeholder='Search...'
				value={searchText}
				onChange={handleSearchOnChange}
			/>
			<span className='clear-search' onClick={clearSearch}>
				&times;
			</span>
		</div>
	);
};

export default Search;
