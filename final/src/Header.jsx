import { VIEWS } from './constants';

function Header({
		className = 'header',
		username,
		currentPage,
		onClickLogin,
		onClickProducts,
		onClickCart,
		cartItemsCount,
		onClickOrders,
		onLogout
	}) {
	let banned;
	if (className === "header__banned") {
		banned = "You are blocked! But you can view our products.";
	}

	return (
		<div className={className}>
			<h3>Ameowzon</h3>
			{banned && <p>{banned}</p>}
			<div className="header__right">
				{username && !banned &&
					<div className="username">
						<img className="avatar" alt={`avatar_${username}`}
							src={`//placehold.co/10x10?text=${username.substring(0, 5)}`}/>
						<span>{username}</span>
					</div>}
				<div className="header__buttons">
					{onClickLogin && currentPage !== VIEWS.LOGIN &&
						<button onClick={onClickLogin} className="button__login">Login</button>}
					{onClickProducts &&
						<button onClick={onClickProducts} className="button__products">Products</button>}
					{onClickCart &&
						<button onClick={onClickCart} className="button__cart">Cart ({cartItemsCount})</button>}
					{onClickOrders &&
						<button onClick={onClickOrders} className="button__orders">Orders</button>}
					{onLogout &&
						<button onClick={onLogout} className="button__logout">Logout</button>}
				</div>
			</div>
		</div>
	);
}

export default Header;