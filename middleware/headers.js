module.exports = (req, res, next) =>{

    res.header('access-control-allow-origin', '*'); //1
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE'); //2 
    res.header('access-control-allow-headers', 'Origin, X-RequestedWith, Content-Type, accept, Authorization'); //3

    next()

}
