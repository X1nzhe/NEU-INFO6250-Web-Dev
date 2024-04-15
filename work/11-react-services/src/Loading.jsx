function Loading({ className='loading', children='Loading...' }) {
    return (
        <div className={className}>
            <i className="gg-spinner-alt"></i>
            {children}
        </div>
    );
}

export default Loading;
