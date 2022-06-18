const Alert = (props) => {
	console.log(props);
	const { alert, dismissAlert } = props;
	// const { alertType, classes, style, floatingTime, position, message } = alert;
	const setPosition = () => {
		let newPosition = alert.position.split(" ");
		return {
			...alert.style,
			[newPosition[0]]: 0,
			[newPosition[1]]: 0,
		};
	};

	return (
		props.alert && (
			<div
				className={`alert ${alert.alertType} ${alert.classes}`}
				style={setPosition()}
			>
				<span className='closebtn' onClick={dismissAlert}>
					&times;
				</span>
				{alert.message}
			</div>
		)
	);
};

// type - info, success, error, warning
// floatingtime? - default time to dismiss itself
// show the children inside
// position? - top left, top right, bottom right, bottom left, if not provided - default - bottom right
// onClose button to dismiss the alert

export default Alert;
