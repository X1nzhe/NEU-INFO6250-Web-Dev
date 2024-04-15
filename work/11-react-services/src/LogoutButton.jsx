function LogoutButton({ onLogout }) {

    return (
        <div className="logout__button">
            <button onClick={onLogout} className="logout">Logout</button>
        </div>
    );
}

export default LogoutButton;