import { MESSAGES_TO_USER } from './constants';

function Error({error}) {

	const message = MESSAGES_TO_USER[error] || MESSAGES_TO_USER.default;
	return (
		<div className="error">
			{error && message}
		</div>
	);
}

export default Error;