let posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' }
];

const getPosts = (req, res) => {
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        res.status(200).json(posts.slice(0, limit));
        return;
    }
    res.status(200).json(posts);
}

const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (post) {
        res.status(200).json(post);
        return;
    }
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
}

const addPost = (req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }
    if(newPost.title) {
        posts.push(newPost);
        res.status(201).json(posts);
        return;
    }
    const error = new Error(`Please include a title for the post`);
    error.status = 400;
    return next(error);
}

const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (post) {
        post.title = req.body.title;
        res.status(200).json(posts);
        return;
    }
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
}

const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex > -1) {
        posts.splice(postIndex, 1);
        res.status(200).json(posts);
        return;
    }
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
}

export { getPosts, getPost, addPost, updatePost, deletePost };