const Users = require("../models/users.js");

exports.signup = (req, res) => {
  const { name, email, contact, password } = req.body;

  let errors = "";
  if (!name) {
    errors = "name is required.";
  } else if (!contact) {
    errors = "contact  is required.";
  } else if (!email) {
    errors = "email is required.";
  } else if (!password) {
    errors = "password is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  var device_token =
    Math.floor(Math.random() * 10000000) +
    name +
    Math.floor(Math.random() * 10000000);

  Users.mobileexist(contact, (err, resss) => {
    // console.log(resss); return false
    if (resss) {
      return res.send({
        success: "no",
        message: "Mobile number already exists",
        data: [],
      });
    } else {
      Users.emailexist(email, (err, ress) => {
        if (ress) {
          return res.send({
            success: "no",
            message: "Email already exists",
            data: [],
          });
        } else {
          var userobj = new Users({
            name: name,
            contact: contact,
            email: email,
            password: password,
            device_token: device_token,
          });
          Users.createuser(userobj, (err, data) => {
            let objj = {};
            objj["user_id"] = data;
            objj["name"] = name;
            objj["device_token"] = device_token;

            // console.log(data); return false
            if (data) {
              return res.send({
                success: "yes",
                message: "Sign up succcessfully.",
                data: objj,
              });
            } else {
              return res.send({
                success: "no",
                message: "Something happen wrong.",
                data: [],
              });
            }
          });
        }
      });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  let errors = "";
  if (!email) {
    errors = "email is required.";
  } else if (!password) {
    errors = "password is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  var device_token = Math.floor(Math.random() * 100000000000);
  // console.log(device_token); return false

  Users.login(email,password,(err, data) => {
    // console.log(data); return false
    var user_id = data.id;
    if (data) {
      Users.settoken(user_id,device_token,(err, tokendata) => {
        // console.log(tokendata); return false
        if (tokendata) {
          var obj = {};
          obj["user_id"] = data.id;
          obj["name"] = data.name;
          obj["device_token"] = device_token;
          return res.send({
            success: "yes",
            message: "User Logged in Successfully.",
            data: obj,
          });
        }
      });
    } else {
      return res.send({
        success: "no",
        message:
          "User doesn't exist.kindly Enter Correct details or Sign up as new user.",
        data: [],
      });
    }
  });
};


