// ---------------------------------------------------------------------------------------------------
// DISTURBED CODE NOT WORKING
// ----------------------------------------------------------------------------------------------
// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     const authHeader = req.header("Authorization");
//     console.log("🔍 Auth Header Received:", authHeader);
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ error: "Access denied. No token provided." });
//     }

//     // Extract the token without "Bearer "
//     const token = authHeader.split(" ")[1];

//     try {
//         const verified = jwt.verify(token, "yourSecretKey");
//         console.log("Decoded Token:", verified);
//         if (!verified.userId) {
//             return res.status(400).json({ error: "Token does not contain user ID" });
//         }
//         //req.user = verified; // Attach user data to request
//         // req.user = { id: verified.id }; // ✅ Attach only the user ID
//          req.user = { id: verified.userId, role: verified.role };  // ✅ Fix

//         console.log("✅ Authenticated User ID:", req.user);
//         next();
//     } catch (error) {
//         console.error("❌ Authentication Error:", error.message);
//         return res.status(400).json({ error: "Invalid token" });
//     }
// }
// ---------------------------------------------------------------------------------------------------
// DISTURBED CODE NOT WORKING END
// ----------------------------------------------------------------------------------------------





// ---------------------------------------------------------------------------------------------------
// THE OG WORKING CODE DO NOT TOUCH THIS IF SOMETHING GOES WRONG THEN WE CAN REVERT BACK HERE
// IF ANY CHANGES NEED THEN COPY THIS CODE AND COMMENT THIS AND AGAIN TRY THIS CODE BUT DO NOT CHANGE IT
// -----------------------------------------------------------------------------------------------------
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
// ---------------------------------------------------------------------------------------------------
// THE END OF OG CODE-------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------