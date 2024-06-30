import { decodeToken } from "../utilities/jwt.js";
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if(typeof authHeader!=="undefined"){
    const token = authHeader.split(' ')[1]
    const userName = await decodeToken(token)
    if(userName){
        req.user = userName;
        next();
    }else{
        res.send("Forbidden entry").status(400)
    }
  }
};
