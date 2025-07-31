const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']; // lowercase 'authorization'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({
        success: false,
        message: "No token provided in Authorization header",
      });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, "SECRET_KEY", (err, decoded) => {
      if (err) {
        console.log(`err.message`+err.message)
        return res.status(401).send({
          success: false,
          message: "Unauthorized User 😒"+err.message,
          Error:err.message
        });
      }

      req.user = decoded; // attach user ID to the request
      next();
    });

  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Please provide a valid auth token",
      error,
    });
  }
};

module.exports = { auth };
