//middleware: when request comes, it checks whether it is correct or not
//if alright, it will send you to the controller like updateProfile
import jwt from "jsonwebtoken";

//next sends you to the next router
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    //till here, if everything works properly, call the next route
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;
