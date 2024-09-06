import jwt from "jsonwebtoken";
import configuration from "../../config/config.js";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "UnAuthorized User!",
    });
  }

  try {
    const decode = jwt.verify(token, configuration.secretKey);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "UnAuthorized User!",
    });
  }
};

export default authMiddleware;
