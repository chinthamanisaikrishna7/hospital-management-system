// module.exports = (roles) => {
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         return res.status(403).json({ error: "Access denied. You do not have permission." });
//       }
//       next();
//     };
//   };
  
// middleware/roleMiddleware.js
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
};

module.exports = roleMiddleware;

