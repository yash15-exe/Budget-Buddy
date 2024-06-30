import jwt from "jsonwebtoken";

export const generateToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRETKEY, {
    expiresIn: "7d",
  });
  return token;
};

export const decodeToken = async (token) => {
  const payload = await jwt.decode(token);
  return payload;
};
