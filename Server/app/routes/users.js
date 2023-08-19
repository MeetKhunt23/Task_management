module.exports = (app) => {
    var router = require("express").Router();
    const fileUpload = require("express-fileupload");
    app.use(fileUpload());
    const users = require("../controllers/users.js");
    app.post("/signup", users.signup);
    app.post("/login", users.login);
    // app.post("/updatebill", users.updatebill);
    // app.post("/addbill", users.addbill);
    // app.post("/logout", users.logout);
    // app.post("/myprofile", users.myprofile);
    // app.post("/updateprofile", users.updateprofile);
    // app.post("/changepassword", users.changepassword);
    // app.post("/forgotpassword", users.forgotpassword);
    // app.post("/checklogindetails", users.checklogindetails);
    // app.post("/event/addevent", users.addevent);
    // app.post("/event/updateevent", users.updateevent);
    // app.post("/checkadmin", users.checkadmin);
  };