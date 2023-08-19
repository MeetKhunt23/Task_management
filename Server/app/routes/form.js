module.exports = (app) => {
    var router = require("express").Router();
    const fileUpload = require("express-fileupload");
    app.use(fileUpload());
    const form = require("../controllers/form.js");
    app.post("/addformdata", form.addformdata)
    app.post("/formlisting", form.formlisting)
    app.post("/deleteallfields", form.deleteallfields)
    app.post("/deletebycomponentid", form.deletebycomponentid)
    app.post("/updateformdata", form.updateformdata)
    app.post("/saveform", form.saveform)
    app.post("/getformdetails", form.getformdetails)
    app.post("/getformsofuser", form.getformsofuser)
    app.post("/deleteformofuser", form.deleteformofuser)
    app.post("/updateformbyuser", form.updateformbyuser)
    app.post("/deletefieldfrommyforms", form.deletefieldfrommyforms)
    app.post("/updatevalidation", form.updatevalidation)






   


    // app.post("/login", users.login);
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