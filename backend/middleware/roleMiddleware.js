const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // 🔐 Check if user exists
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // 🔐 Check role
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

export default authorizeRoles;