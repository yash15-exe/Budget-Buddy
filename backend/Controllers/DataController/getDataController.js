import userModel from "../../Model/userModel.js";

export const getDataController = async (req, res) => {
  try {
    const userName = req.user.userName;
    console.log(userName);
    if (!userName) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const user = await userModel.findOne({ userName });
    console.log(user);
    if (user) {
      const data = user.financeRecord;
      return res.json({data:user.financeRecord}).status(200);
    } else {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Failed to get data:", error);
    return res.status(500).send({ message: "Server side issue occurred" });
  }
};
