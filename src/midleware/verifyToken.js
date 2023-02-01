import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token.split(' ')[1];
  console.log('check token',authHeader)
  if (!authHeader) {
    return res.status(403).json('Token is not valid')
  } else {
    //Decode JWT token
    jwt.verify(authHeader, process.env.PASS_SEC, (err, user) => {
      if (err) return res.status(500).json("You are not alow!");
      req.user = user;
      next();
    });
  }
};
export const verifyTokenAndAuthorization = (req,res,next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(500).json("You are now allow!");
    }
  });
};
export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isAdmin) {
      res.status(500).json("You are not Admin, You cannot do this task!");
    } else {
      next();
    }
  });
};
