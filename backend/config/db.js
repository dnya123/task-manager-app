import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dnyaneshwaridhakulkar_db_user:IzeTdJq5MHFsO9Ed@cluster0.bfwesvr.mongodb.net/taskapp?retryWrites=true&w=majority"
    );
    console.log("MongoDB Connected ");
  } catch (error) {
    console.log("DB Error ", error);
  }
};

export default connectDB;