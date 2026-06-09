const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const authMiddleware = (socket, next) => {
     
  try {

    const cookies = cookie.parse(socket.handshake.headers.cookie || "");

    const token = cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_PSWD);

    socket.user = decoded;

    next();
  } catch (err) {
    next(new Error("Authentication failed"));
  }
};

module.exports = authMiddleware;
