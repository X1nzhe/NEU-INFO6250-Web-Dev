import { useState } from 'react';

function LoginForm({onLogin}) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState(''); // Store password but ignore it

	function onChangeUsername(e) {
		setUsername(e.target.value);
	}

	function onChangePassword(e) {
		setPassword(e.target.value);
	}

	function onSubmit(e) {
		e.preventDefault();
		if (username) {
			onLogin(username);
		}
	}

	return (
		<div className="login">
			<form className="login__form" action="#/login" onSubmit={onSubmit}>
				<label>
					<span>Username: </span>
					<input className="login__username"
                            value={username}
                            onChange={onChangeUsername}
					/>
				</label>
				<label>
					<span>Password: </span>
					<input
						type="password"
						value={password}
						onInput={onChangePassword}
					/>
				</label>
				<button
					className="login__button"
					type="submit"
				>
					Login
				</button>
			</form>
			<div>
				<p>Note to administrator: Do not forget &#39;admin&#39;.</p>
			</div>
		</div>
	);
}

export default LoginForm;