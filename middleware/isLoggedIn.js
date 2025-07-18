import jwt from 'jsonwebtoken'

function isLoggedIn(req, res, next) {
    if(!req.headers['authorization']) {
        return res.status(401).json({
            msg: 'Authorization token is missing'
        })
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET
        const jwtPayload = jwt.verify(req.headers['authorization'], "secret")
        req['username'] = jwtPayload.username
        next()
    } catch (error) {
        console.log('Error while verifying JWT', error)
        return res.status(401).json({
            msg: error?.message || "Invalid JWT"
        })
    }
}

export default isLoggedIn;