const sql = require("./db.js");

const Project = function (project) {
  this.project_name = project.project_name;
  this.user_id = project.user_id;
};

Project.addproject = (user_id, project_name, status, result) => {
  sql.query(
    `INSERT INTO project SET project_name=?,user_id=?,status=?`,
    [project_name, user_id, status],
    (err, res) => {
      result(null, res.insertId);
      return;
    }
  );
};

Project.addmilestone = (user_id, project_id, milestone_name, result) => {
  sql.query(
    `INSERT INTO milestone SET user_id=?,project_id=?,milestone_name=?`,
    [user_id, project_id, milestone_name],
    (err, res) => {
      // console.log(res); return false
      result(null,res.insertId);
      return;
    }
  );
};

Project.addmodule = (
  user_id,
  project_id,
  milestone_id,
  module_name,
  result
) => {
  // console.log(user_id); return false
  sql.query(
    `INSERT INTO module SET user_id=?,project_id=?,milestone_id=?,module_name=?`,
    [user_id, project_id, milestone_id, module_name],
    (err, res) => {
      // console.log(err); return false
      result(null, res.insertId);
      return;
    }
  );
};

Project.projectlisting = (user_id, result) => {
  sql.query(
    `SELECT p.id,p.project_name,p.user_id,p.status,p.create_date,(SELECT COUNT(id) FROM milestone WHERE user_id=${user_id} AND project_id=p.id)as total_milestone,(SELECT COUNT(id) FROM module WHERE user_id=${user_id} AND project_id=p.id)as total_module FROM project as p WHERE p.user_id=${user_id}`,
    (err, res) => {
      // console.log(res); return false
      result(null, res);
      return;
    }
  );
};

Project.getmilestones = (user_id, project_id, result) => {
  sql.query(
    `SELECT * FROM milestone WHERE user_id=? AND project_id=?`,
    [user_id, project_id],
    (err, res) => {
      // console.log(res); return false
      result(null, res);
      return;
    }
  );
};

Project.modulelisting = (user_id, project_id, milestone_id, result) => {
  sql.query(
    `SELECT * FROM module WHERE user_id=? AND project_id=? AND milestone_id=?`,
    [user_id, project_id, milestone_id],
    (err, res) => {
      result(null, res);
      return;
    }
  );
};
module.exports = Project;
