import userModel from "../../Model/userModel.js";

export const addDataController = async (req, res) => {
  try {
    const request = req.body;
    const data = request.data;
    const newTransaction = {
      transactionName: data.transactionName,
      domain: data.domain,
      transactionDate: data.date,
      transactionType: data.transactionType,
      transactionAmount: data.transactionAmount,
      message: data.message || "",
    };

    const userName = req.user.username;

    const result = await userModel.findOneAndUpdate(
      { userName },
      {
        $push: { financeRecord: newTransaction },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );

   res.send({message:"Data Added..."}).status(200)
  } catch (error) {
    console.log("Failed to add data :" + "  Error: " + error);
  }
};
