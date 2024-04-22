import Loading from './Loading';
import { SHOW } from './constants';

function Orders({isPageLoading, orders, onDeleteOrder}) {
    let show;
    if (isPageLoading) {
        show = SHOW.PENDING;
    } else if (!Object.keys(orders).length) {
        show = SHOW.EMPTY;
    } else {
        show = SHOW.CONTENT;
    }


    return (
        <div className='content'>
            {show === SHOW.PENDING && <Loading className="orders__waiting"></Loading>}
            {show === SHOW.EMPTY && <p className="orders__empty">No order yet.</p>}
            {show === SHOW.CONTENT && (
                <>
                    <ul className="orders">
                        {Object.values(orders).map(order => (
                            <li className="order" key={order.id}>
                                <p>Username: {order.username}</p>
                                <p>Items: {order.totalQuantity}</p>
                                <p>Total Price: {order.totalPrice}</p>
                                <button
                                    data-id={order.id}
                                    className="order__complete"
                                    onClick={(e) => {
                                        const id = e.target.dataset.id;
                                        onDeleteOrder(id);
                                    }}>&#9989;Complete
                                </button>
                                <button
                                    data-id={order.id}
                                    className="order__delete"
                                    onClick={(e) => {
                                        const id = e.target.dataset.id;
                                        onDeleteOrder(id);
                                    }}>&#10060;Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Orders;