const detokenize = require('../utils/detokenizer');

const authCheck = async (req, res, next) => {
    if(req.cookies === undefined) {
        console.log("Cookies undefined, redirecting to login page.")
        return res.status(300).redirect('/login')
    }

    const token = req.cookies.token

    try {
        const decodedToken = detokenize(token)

        const userExists = await User.findOne({email:decodedToken.email, username:decodedToken.username})

        if(userExists) console.log("\nSession authenticated successfully\n")

        next()

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error("\nToken expired\n")

            res.clearCookie('token')
            res.status(200).json({ message: "Session expired, please login again." })
        }
        else{
            console.error("\nFailed to verify token:", error)
    
            // Handle invalid token error
            res.status(401).json({ error: "Unauthorized" })
        }
        // HANDLE REDIRECT TO LOGIN PAGE IN FRONTEND !!
    }
}

module.exports = authCheck;