import Classes from "./alert.module.css";
const Alert = (props) => {
	const { alert, dismissAlert } = props;
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
				className={`${Classes.alert} ${Classes[alert.alertType]} ${
					Classes[alert.classes]
				}`}
				style={setPosition()}
			>
				<span className={Classes["closebtn"]} onClick={dismissAlert}>
					&times;
				</span>
				{alert.message}
			</div>
		)
	);
};

export default Alert;
