module.exports = async function (req, res, next) {
    try {
        if (!req.headers || !req.headers.authorization) {
            return res.badRequest({ err: 'authorization header is missing' })
        }
        const tokenParam = req.headers.authorization
        const decodedToken = JWTService.verify(tokenParam)
        const user = await User.findOne({
            id: decodedToken.user
        })
        if (!user) {
            next({ err: 'invalid credentials provided' })
        }
        req.pushToken = user.pushToken
        req.user = user.id
        req.phone = user.phone
        next()
    }
    catch (err) {
        return res.badRequest({ err })
    }
}