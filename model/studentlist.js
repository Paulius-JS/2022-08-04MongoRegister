import mongoose from "mongoose";

const Schema = mongoose.Schema;

const StudentList = new Schema({
  name: String,
  lastName: String,
  adress: String,
  phone: String,
  email: String,
  SocNumb: String,
});

export default mongoose.model("StudentList", StudentList);
