const sql = require("./db.js");
const moment = require("moment");

const Task = function (task) {
  this.user_id = task.projuser_idect_name;
  this.project_name = task.project_name;
  this.milestone = task.milestone;
  this.module = task.module;
  this.task = task.task;
  this.estimated_time = task.estimated_time;
  this.result = task.result;
};

Task.addtask = (
  user_id,
  project_name,
  milestone,
  modulle,
  task,
  estimated_time,
  resuming_time,
  started_time,
  priority,
  result
) => {
  sql.query(
    `INSERT INTO tasks SET user_id=?,project_name=?,milestone=?,module=?,task=?,estimated_time=?,resuming_time=?,started_time=?,priority=?`,
    [
      user_id,
      project_name,
      milestone,
      modulle,
      task,
      estimated_time,
      resuming_time,
      started_time,
      priority,
    ],
    (err, res) => {
      // console.log(err); return false
      result(null, res.insertId);
      return;
    }
  );
};

Task.addtasktiming = (task_id, started_time, result) => {
  sql.query(`INSERT INTO task_timings SET task_id=?`, [task_id], (err, res) => {
    result(null, res.insertId);
    return;
  });
};

Task.getalltaskid = (user_id, result) => {
  sql.query(
    `SELECT id,started_time,resuming_time,status FROM tasks WHERE user_id=?`,
    [user_id],
    (err, res) => {
      // console.log(res); return false
      result(null, res);
      return;
    }
  );
};

Task.getpausedtimings = (task_id, result) => {
  sql.query(
    `SELECT SEC_TO_TIME(SUM(TIME_TO_SEC(time_taken_till_pause)))as hours_taken FROM task_timings WHERE task_id=${task_id}`,
    (err, res) => {
      // console.log(res); return false
      result(null, res[0]);
      return;
    }
  );
};

Task.getresuminghours = (continuehour, resuming_time, task_id, result) => {
  sql.query(
    `SELECT ADDTIME("${continuehour}","${resuming_time}") as Sum_Of_time FROM tasks where id=${task_id}`,
    (err, res) => {
      // console.log(res); return false
      result(null, res[0]);
      return;
    }
  );
};

Task.addhourstaken = (task_id, hours_taken, result) => {
  sql.query(
    `UPDATE tasks SET taken_hours=? WHERE id=?`,
    [hours_taken, task_id],
    (err, res) => {
      // console.log(res); return false
      result(null, task_id);
      return;
    }
  );
};

Task.addhourstakenwithoutpause = (task_id, started_time, result) => {
  var today = moment(new Date());
  var time = today.format("HH:mm:ss");
  sql.query(
    `UPDATE tasks SET taken_hours=(SELECT TIMEDIFF("${time}","${started_time}")) WHERE id=?`,
    [task_id],
    (err, res) => {
      // console.log(res); return false
      result(null, task_id);
      return;
    }
  );
};

Task.checkpasuedtimingavailable = (task_id, result) => {
  sql.query(
    `SELECT * FROM task_timings WHERE task_id=?`,
    [task_id],
    (err, res) => {
      // console.log(res); return false
      result(null, res[0]);
      return;
    }
  );
};

Task.updatestatusoftask = (task_id, updated_hours, result) => {
  sql.query(
    `UPDATE tasks SET status=1,taken_hours=? WHERE id=?`,
    [updated_hours, task_id],
    (err, res) => {
      // console.log(res); return false
      result(null, task_id);
      return;
    }
  );
};

Task.updatestatusoftaskresume = (task_id, result) => {
  sql.query(`UPDATE tasks SET status=0 WHERE id=?`, [task_id], (err, res) => {
    result(null, task_id);
    return;
  });
};

Task.addpausedtasktiming = (task_id, user_id, resuming_time, result) => {
  var today = moment(new Date());
  var time = today.format("HH:mm:ss");
  sql.query(
    `INSERT INTO task_timings SET task_id=${task_id},user_id=${user_id},started_time="${resuming_time}",status=1,time_taken_till_pause=(SELECT TIMEDIFF("${time}","${resuming_time}"))`,
    (err, res) => {
      // console.log(err); return false
      result(null, res.insertId);
      return;
    }
  );
};

Task.gettillpausedtime = (task_id, result) => {
  sql.query(`SELECT `);
};

Task.tasklisting = (user_id, result) => {
  sql.query(`SELECT * FROM tasks WHERE user_id=?`, [user_id], (err, res) => {
    result(null, res);
    return;
  });
};

Task.pausetask = (task_id, result) => {
  sql.query(`UPDATE tasks SET status=2 WHERE id=?`, [task_id], (err, res) => {
    result(null, task_id);
    return;
  });
};

Task.resumetask = (task_id, result) => {
  var today = moment(new Date());
  var time = today.format("HH:mm:ss");
  sql.query(
    `UPDATE tasks SET resuming_time="${time}" WHERE id=${task_id}`,
    (err, res) => {
      result(null, task_id);
      return;
    }
  );
};

Task.getstartedtime = (task_id, result) => {
  sql.query(
    `SELECT started_time FROM  tasks WHERE id=?`,
    [task_id],
    (err, res) => {
      // console.log(err); return false
      result(null, res[0]);
      return;
    }
  );
};

Task.gettimetillpause = (task_id, startedtime, result) => {
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  sql.query(
    `UPDATE tasks SET time_taken_till_pause=(SELECT(TIMEDIFF("${time}","${startedtime}")) as time_taken_till_pause FROM  tasks WHERE id=${task_id}) WHERE id=${task_id}`,
    (err, res) => {
      // console.log(err); return false;
      result(null, res[0]);
      return;
    }
  );
};

Task.findtaskapusedavailable = (task_id, result) => {
  sql.query(
    `SELECT * FROM task_timings WHERE task_id=?`,
    [task_id],
    (err, res) => {
      // console.log(res); return false
      result(null, res[0]);
      return;
    }
  );
};

Task.getalldetailsoftask = (task_id, result) => {
  sql.query(`SELECT * FROM tasks WHERE id=?`, [task_id], (err, res) => {
    // console.log( res); return false
    result(null, res[0]);
    return;
  });
};

Task.getresuminigcontinuehours = (task_id, resuming_time, result) => {
  var today = moment(new Date());
  var time = today.format("HH:mm:ss");
  sql.query(
    `SELECT TIMEDIFF("${time}","${resuming_time}") as continue_time`,
    (err, res) => {
      // console.log(res); return false
      result(null, res[0]);
      return;
    }
  );
};

Task.changetasksstatus = (task_id, result) => {
  sql.query(`UPDATE tasks SET status=2 WHERE id=?`, [task_id], (err, res) => {
    result(null, task_id);
    return;
  });
};

Task.changettstatus=(task_id,result)=>{
sql.query(`UPDATE task_timings SET status=2 WHERE task_id=?`,[task_id],(err,res)=>{
  // console.log(err); return false
  result(null,task_id)
  return
})
}

Task.findprojectname=(project_id,result)=>{
  sql.query(`SELECT project_name FROM project WHERE id=?`,[project_id],(err,res)=>{
    result(null,res[0])
    return
  })
}
module.exports = Task;
