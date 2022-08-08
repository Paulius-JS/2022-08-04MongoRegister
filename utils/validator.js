import studentlist from "../model/studentlist.js";
async function ValidatorTest() {
  let printer = await studentlist.find();
  //   const formInfo = req.body;
  if (JSON.stringify(formInfo) == "{}") {
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
}

export default ValidatorTest;
