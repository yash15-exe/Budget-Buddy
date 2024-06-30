import userModel from "../../Model/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utilities/jwt.js";

const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const request = req.body;

    const userName = request.username;
    const password = request.password;
    const email = request.email;

    const hashedPassword = await bcrypt.hash(password, 12);
    const existingUser = await userModel.findOne({ userName });
    if (existingUser) {
      res.send({
        message:
          "User already exist with this username, Please login or change username",
      });
      return;
    }
    const newUser = new userModel({
      userName,
      password: hashedPassword,
      email,
    });

    newUser.save().then(() => {
      const payload = { userName };
      generateToken(payload).then((token) => {
        res
          .send({ token, message: "User registered Successfully" })
          .status(200);
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Error in registering you in. Error: ${error}`,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const request = req.body;
    console.log(request);
    const userName = request.username;
    const password = request.password;

    const existingUser = await userModel.findOne({ userName });
    if (existingUser) {
      const isValidPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (isValidPassword) {
        const payload = { userName };
        const token = await generateToken(payload);
        res.json({ token:token, message: "Logged in Successfully" }).status(200);
      } else {
        res
          .json({
            message: `Incorrect Password, please enter a correct password`,
          })
          .status(400);
      }
    } else {
      res
        .json({
          message: `The user doesnt exist, pls check the username`,
        })
        .status(401);
    }
  } catch (error) {
    console.log(error);
    res
      .json({
        message: `Error in logging you in. Error: ${error}`,
      })
      .status(500);
  }
};

export { registerUser, loginUser };
