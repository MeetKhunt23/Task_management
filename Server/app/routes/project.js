module.exports = (app) => {
    var router = require("express").Router();
    const fileUpload = require("express-fileupload");
    app.use(fileUpload());
    const project = require("../controllers/project.js");
    app.post("/addproject", project.addproject);
    app.post("/addmilestone", project.addmilestone);
    app.post("/addmodule", project.addmodule)
    app.post("/projectlisting", project.projectlisting)
    app.post("/milestonelisting", project.milestonelisting);
    app.post("/modulelisting", project.modulelisting);


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