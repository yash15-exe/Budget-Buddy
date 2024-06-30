import mongoose,{Decimal128} from "mongoose";


const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    financeRecord: [
      {
        transactionName: {
          type: String,
          required: true,
        },
        domain: {
          type: String,
          required: true,
        },
        transactionId: {
          type: String,
          unique: true,
          default: () => new mongoose.Types.ObjectId().toHexString(), // Generate ObjectId as default value
          required:true
        },
        transactionDate: {
          type: Date,
          required: true,
        },
        transactionType: {
          type: String,
          required: true,
        },
        transactionAmount: {
          type: Decimal128,
          required: true,
        },
        message: {
          type: String,
        },
      },
    ],
  },
  {
    timeStamps: true,
  }
);
userSchema.index({ "financeRecord.transactionDate": 1 });
export default mongoose.model("user", userSchema);
