const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // Extract the token without "Bearer "
    const token = authHeader.split(" ")[1];

    try {
        const verified = jwt.verify(token, "yourSecretKey");
        req.user = verified; // Attach user data to request
        next();
    } catch (error) {
        return res.status(400).json({ error: "Invalid token" });
    }
}