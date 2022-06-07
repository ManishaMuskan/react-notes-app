const NotesMenu = () => {
	return (
		<div className='sidebar-menu'>
			<div className='searchbox'>
				<input type='text' />
				<i>x</i> {/* cancel button */}
			</div>
			<div className='toggle-view'>
				<button>List</button>
				<button>Grid</button>
			</div>
		</div>
	);
};

export default NotesMenu;
