import userModel from "../../Model/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utilities/jwt.js";

const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { username, password, email } = req.body;
    console.log(req.body);
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this username. Please login or choose a different username.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new userModel({
      userName: username,
      password: hashedPassword,
      email,
    });

    await newUser.save();

    const payload = { username };
    const token = await generateToken(payload);
    return res.status(200).json({ token, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Error registering user. Error: ${error.message}`,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    console.log(username);
    const existingUser = await userModel.findOne({ userName: username });
    console.log(existingUser);
    if (!existingUser) {
      return res.status(401).json({
        message: "User does not exist. Please check the username.",
      });
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Incorrect password. Please enter the correct password.",
      });
    }

    const payload = { username };
    const token = await generateToken(payload);
    return res.status(200).json({ token, message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Error logging in. Error: ${error.message}`,
    });
  }
};

export { registerUser, loginUser };
