const Task = require("../models/task.js");
const moment = require("moment");

exports.addtask = (req, res) => {
  const {
    user_id,
    project_id,
    milestone_id,
    module_id,
    task,
    estimated_time,
    priority,
  } = req.body;

  let errors = "";
  if (!user_id) {
    errors = "user_id is required.";
  } else if (!project_id) {
    errors = "project_id is required.";
  } else if (!milestone_id) {
    errors = "milestone_id is required.";
  } else if (!module_id) {
    errors = "module_id is required.";
  } else if (!task) {
    errors = "task is required.";
  } else if (!estimated_time) {
    errors = "estimated_time is required.";
  } else if (!priority) {
    errors = "priority is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Task.findprojectname(project_id, (err, namedata) => {
    if (namedata) {
      var project_name = namedata.project_name;
      var dateandtime = moment(new Date());
      var time = dateandtime.format("HH:mm:ss");
      // console.log(time); return false
      var resuming_time = time;
      var started_time = time;

      Task.addtask(
        user_id,
        project_name,
        milestone_id,
        module_id,
        task,
        estimated_time,
        resuming_time,
        started_time,
        priority,
        (err, data) => {
          // console.log(data); return false
          if (data) {
            return res.send({
              success: "yes",
              message: "Task Added SuccessFully.",
              data: data,
            });
          }
        }
      );
    }
  });
  // console.log(data); return false
};

exports.tasklisting = (req, res) => {
  const { user_id } = req.body;

  let errors = "";
  if (!user_id) {
    errors = "user_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Task.getalltaskid(user_id, (err, iddata) => {
    if (iddata) {
      var ids = iddata;
      // console.log(ids); return false
      ids.forEach((pro) => {
        Task.getpausedtimings(pro.id, (err, pausedtimingdata) => {
          // console.log(pausedtimingdata.hours_taken); return false
          if (pausedtimingdata.hours_taken !== null) {
            if (pro.status === 0) {
              // console.log(pro.status); return false;
              Task.getresuminigcontinuehours(
                pro.id,
                pro.resuming_time,
                (err, continuehours) => {
                  var continuehour = continuehours.continue_time;
                  Task.getresuminghours(
                    continuehour,
                    pausedtimingdata.hours_taken,
                    pro.id,
                    (err, conthours) => {
                      var hours_taken = conthours.Sum_Of_time;
                      Task.addhourstaken(
                        pro.id,
                        hours_taken,
                        (err, data) => {}
                      );
                    }
                  );
                }
              );
            } else {
              var hours_taken = pausedtimingdata.hours_taken;
              // console.log(hours_taken); return false
              Task.addhourstaken(pro.id, hours_taken, (err, data) => {});
            }
          } else {
            Task.addhourstakenwithoutpause(
              pro.id,
              pro.started_time,
              (err, pausedata) => {
                // console.log("heyy");
              }
            );
          }
        });
      });
    }
  });

  Task.tasklisting(user_id, (err, data) => {
    if (data) {
      return res.send({
        success: "yes",
        message: "Here is the list of task.",
        data: data,
      });
    }
  });
};

exports.pausethetask = (req, res) => {
  const { task_id } = req.body;

  let errors = "";
  if (!task_id) {
    errors = "task_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }
  Task.getalldetailsoftask(task_id, (err, detailsoftaskdata) => {
    var user_id = detailsoftaskdata.user_id;
    var resuming_time = detailsoftaskdata.resuming_time;
    Task.addpausedtasktiming(
      task_id,
      user_id,
      resuming_time,
      (err, pausedtimingdata) => {
        // console.log(pausedtimingdata); return false
        Task.getpausedtimings(task_id, (err, getdata) => {
          var updated_hours = getdata.hours_taken;
          Task.updatestatusoftask(task_id, updated_hours, (err, statusdata) => {
            if (statusdata) {
              return res.send({
                success: "yes",
                message: "Task Paused",
                data: pausedtimingdata,
              });
            }
          });
        });
      }
    );
  });
};

exports.resumetask = (req, res) => {
  const { task_id } = req.body;
  let errors = "";
  if (!task_id) {
    errors = "task_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Task.resumetask(task_id, (err, data) => {
    Task.updatestatusoftaskresume(task_id, (err, resumedata) => {
      if (data) {
        return res.send({
          success: "yes",
          message: "Task Resumed!",
          data: data,
        });
      }
    });
  });
};

exports.taskdone = (req, res) => {
  const { task_id } = req.body;
  let errors = "";
  if (!task_id) {
    errors = "task_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Task.changetasksstatus(task_id, (err, taskdata) => {
    Task.changettstatus(task_id, (err, tasktimingdata) => {
      if (tasktimingdata) {
        return res.send({
          success: "yes",
          message: "Task Completed..!",
          data: [],
        });
      }
    });
  });
};
