module.exports = (app) => {
    var router = require("express").Router();
    const fileUpload = require("express-fileupload");
    app.use(fileUpload());
    const task = require("../controllers/task.js");
    app.post("/addtask",task.addtask);
    app.post("/tasklisting",task.tasklisting);
    app.post("/pausethetask",task.pausethetask);
    app.post("/resumetask",task.resumetask);
    app.post("/taskdone",task.taskdone);

    
  };