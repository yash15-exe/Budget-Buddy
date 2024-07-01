import userModel from "../../Model/userModel.js";

export const deleteDataController = async (req, res) => {
  try {
    const userName = req.user.username;
   
    const { transactionId } = req.body;

    if (!userName || !transactionId) {
      return res.status(400).send({ message: "Invalid credentials or transaction ID" });
    }

    const result = await userModel.updateOne(
      { userName },
      { $pull: { financeRecord: { transactionId } } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).send({ message: "Transaction record deleted successfully" });
    } else {
      res.status(404).send({ message: "Transaction record not found or already deleted" });
    }
  } catch (error) {
    console.error("Error in deleting record:", error);
    res.status(500).send({ message: "Error in deleting record" });
  }
};
