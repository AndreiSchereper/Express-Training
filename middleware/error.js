const errorHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json({ error: err.message });
        return;
    }
    res.status(500).json({ error: 'Something went wrong' });
}

export default errorHandler;