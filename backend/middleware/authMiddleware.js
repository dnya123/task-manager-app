import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(
      token,
      "mysecretkey"
    );

      req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;