import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import studentlist from "./model/studentlist.js";
import {
  msg1,
  msg2,
  msg3,
  msg4,
  msg5,
  msg6,
  msg7,
  msg8,
  msg9,
  msg10,
  msgDanger,
  msgSuccess,
  msgSFD,
  msgEL,
} from "./utils/messages.js";

//Uncoment only for test pruposes
// import RegisterTest from "./utils/RegisterDbTest.js";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/public", express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

const conn = await mongoose.connect("mongodb://localhost:27017/test");

// --------TESTER---------
// RegisterTest();
// -----------------------
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  let printer = await studentlist.find();
  const formInfo = req.body;

  if (JSON.stringify(req.body) == "{}") {
    return res.render("./add", {
      message: msg9,
      status: msgDanger,
    });
  } else if (req.body.name == "") {
    return res.render("./add", {
      message: msg1,
      status: msgDanger,
      formInfo,
    });
  } else if (req.body.lastName == "") {
    return res.render("./add", {
      message: msg2,
      status: msgDanger,
      formInfo,
    });
  } else if (req.body.adress == "") {
    return res.render("./add", {
      message: msg3,
      status: msgDanger,
      formInfo,
    });
  } else if (req.body.phone == "") {
    return res.render("./add", {
      message: msg4,
      status: msgDanger,
      formInfo,
    });
  } else if (req.body.email == "") {
    return res.render("./add", {
      message: msg5,
      status: msgDanger,
      formInfo,
    });
  } else if (req.body.SocNumb == "") {
    return res.render("./add", {
      message: msg6,
      status: msgDanger,
      formInfo,
    });
  }
  if (
    printer.find((user) => {
      return user.email == req.body.email;
    })
  )
    return res.render("./add", {
      message: msg8,
      status: msgDanger,
      formInfo,
    });

  if (
    printer.find((user) => {
      return user.SocNumb == req.body.SocNumb;
    })
  )
    return res.render("./add", {
      message: msg7,
      status: msgDanger,
      formInfo,
    });

  if (req.body.phone.length < 8 || req.body.phone.length > 9)
    return res.render("./add", {
      message: msg10,
      status: msgDanger,
      formInfo,
    });

  try {
    const newStudent = new studentlist();
    (newStudent.name = req.body.name),
      (newStudent.lastName = req.body.lastName),
      (newStudent.adress = req.body.adress),
      (newStudent.phone = "+370" + req.body.phone),
      (newStudent.email = req.body.email),
      (newStudent.SocNumb = req.body.SocNumb);
    await newStudent.save();
    res.render("./add");
  } catch {
    res.render("./add");
  }
});

app.get("/list", async (req, res) => {
  let printer = await studentlist.find().lean();
  let options = { printer };
  if (req.query.success == 1) {
    options.message = msgSFD;
    options.status = msgSuccess;
  }

  if (printer.length == 0) {
    return res.render("list", {
      message: msgEL,
      status: msgDanger,
    });
  }
  res.render("list", options);
});

app.post("/list", async (req, res) => {
  let printer = await studentlist.find();
  const checkedItemId = req.body.checkbox;
  let uniq = printer.find((user) => {
    user._id;
  });
  if (Array.isArray(req.body.checkbox)) {
    for (let i = 0; i < req.body.checkbox.length; i++) {
      await studentlist.findByIdAndDelete(req.body.checkbox[i]);
    }
  } else {
    await studentlist.findByIdAndDelete(req.body.checkbox);
  }
  return res.redirect("/list?success=1", uniq, { printer });
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let printer = await studentlist.find().lean();
    let deleter = printer[id]._id;
    await studentlist.deleteOne({ _id: deleter });

    res.redirect("/list?success=1");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000);
