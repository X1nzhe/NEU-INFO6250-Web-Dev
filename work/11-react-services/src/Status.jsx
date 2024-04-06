import { MESSAGES_TO_USER } from './constants';

function Status({ error }) {

    const message = MESSAGES_TO_USER[error] || MESSAGES_TO_USER.default;
    return (
        <div className="status">
            {error && message}
        </div>
    );
}

export default Status;