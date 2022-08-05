import studentlist from "../model/studentlist.js";

async function RegisterTest() {
  const newStudent = new studentlist();
  newStudent.name = "Name";
  newStudent.lastName = "Last Name";
  newStudent.adress = "Adress";
  newStudent.phone = "Phone number";
  newStudent.email = "Email@";
  newStudent.SocNumb = "soc sec number";
  await newStudent.save();
}

export default RegisterTest;
