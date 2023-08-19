const Project = require("../models/project.js");
const moment = require("moment");

exports.addproject = (req, res) => {
  const { user_id, project_name } = req.body;

  let errors = "";
  if (!user_id) {
    errors = "user_id is required.";
  } else if (!project_name) {
    errors = "project_name is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  var status = 0;

  Project.addproject(user_id, project_name, status, (err, data) => {
    if (data) {
      return res.send({
        success: "yes",
        message: "project added succesfully.",
        data: [],
      });
    }
  });
};

exports.addmilestone = (req, res) => {
  const { user_id, project_id, milestone_name } = req.body;
  let errors = "";
  if (!user_id) {
    errors = "user_id is required.";
  } else if (!project_id) {
    errors = "project_id is required.";
  } else if (!milestone_name) {
    errors = "milestone_name is required.";
  }
  // console.log(milestone_name); return false

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }
  // console.log(Array.isArray(milestone_name)); return false
  if (Array.isArray(milestone_name)) {
    var data = milestone_name;
    data.forEach((pro) => {
      Project.addmilestone(user_id, project_id, pro, (err, data) => {});
    });
    return res.send({
      success: "yes",
      message: "Milestone added Successfully.",
      data: [],
    });
  } else {
    Project.addmilestone(user_id, project_id, milestone_name, (err, data) => {
      if (data) {
        return res.send({
          success: "yes",
          message: "Milestone added Successfully.",
          data: data,
        });
      }
    });
  }
};

exports.addmodule = (req, res) => {
  const { user_id, project_id, milestone_id, module_name } = req.body;
  // console.log(req.body); return false
  let errors = "";
  if (!user_id) {
    errors = "user_id is required.";
  } else if (!project_id) {
    errors = "project_id is required.";
  } else if (!milestone_id) {
    errors = "milestone_id is required.";
  } else if (!module_name) {
    errors = "module_name is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  // console.log(req.body); return false
  if (Array.isArray(module_name)) {
    var data = module_name;
    data.forEach((pro) => {
      Project.addmodule(
        user_id,
        project_id,
        milestone_id,
        pro,
        (err, data) => {}
      );
    });
    return res.send({
      success: "yes",
      message: "Module added Successfully.",
      data: [],
    });
  } else {
    Project.addmodule(
      user_id,
      project_id,
      milestone_id,
      module_name,
      (err, data) => {
        if (data) {
          return res.send({
            success: "yes",
            message: "Module added Successfully.",
            data: data,
          });
        }
      }
    );
  }
};

exports.projectlisting = (req, res) => {
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

  Project.projectlisting(user_id, (err, data) => {
    if (data) {
      var array = [];
      var pdata = data;
      // console.log(pdata); return false

      pdata.forEach((pro) => {
        var obj = {};
        var status;
        if (pro.status == "0") {
          status = "Running";
        }
        if (pro.status == "0.5") {
          status = "Paused";
        }
        if (pro.status == "1") {
          status = "Completed";
        }
        var date = moment(pro.create_date);
        var added_on = date.format("DD-MM-YYYY HH:mm:ss");
        // console.log(added_on); return false
        obj["id"] = pro.id;
        obj["project_name"] = pro.project_name;
        obj["user_id"] = pro.user_id;
        obj["status"] = status;
        obj["Added_on"] = added_on;
        obj["total_milestone"] = pro.total_milestone;
        obj["total_module"] = pro.total_module;
        array.push(obj);
      });
      return res.send({
        success: "yes",
        message: "Here is list of project",
        data: array,
      });
    }
  });
};

exports.milestonelisting = (req, res) => {
  const { user_id, project_id } = req.body;
  let errors = "";
  if (!user_id) {
    errors = "user_id is required.";
  } else if (!project_id) {
    errors = "project_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Project.getmilestones(user_id, project_id, (err, data) => {
    if (data) {
      return res.send({
        success: "yes",
        message: "Here is list of milestones.",
        data: data,
      });
    }
  });
};

exports.modulelisting = (req, res) => {
  const { user_id, project_id, milestone_id } = req.body;
  let errors = "";
  if (!user_id) {
    errors = "user_id is required.";
  } else if (!project_id) {
    errors = "project_id is required.";
  } else if (!milestone_id) {
    errors = "milestone_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Project.modulelisting(user_id, project_id, milestone_id, (err, data) => {
    if (data) {
      return res.send({
        success: "yes",
        message: "Here is list of Modules available",
        data: data,
      });
    }
  });
};
