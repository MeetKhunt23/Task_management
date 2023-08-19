const sql = require("./db.js");

const Users = function (users) {
  this.name = users.name;
  this.contact = users.contact;
  this.email = users.email;
  this.password = users.password;
  this.device_token = users.device_token;
};

Users.mobileexist = (mobile, result) => {
    sql.query(
      `SELECT * FROM users WHERE contact=${mobile}`,
      (err, res) => {
        result(null, res[0]);
        return;
      }
    );
  };

  Users.emailexist = (email, result) => {
    sql.query(
      `SELECT * FROM users WHERE email=?`,
      [email],
      (err, res) => {
        // console.log(err); return false
        result(null, res[0]);
        return;
      }
    );
  };

  Users.createuser = (userobj, result) => {
    sql.query(`INSERT INTO users SET ?`, [userobj], (err, res) => {
    //   console.log(err); return false
      result(null, res.insertId);
      return;
    });
  };


  Users.login = (email, password, result) => {
    sql.query(
      `SELECT * FROM users WHERE email=? AND password=? `,
      [email, password],
      (err, res) => {
        // console.log(res); return false
        result(null, res[0]);
        return;
      }
    );
  };

  Users.settoken=(user_id, device_token,result)=>{
    sql.query(`UPDATE users SET device_token=? WHERE id =?`,[device_token,user_id],(err,res)=>{
      // console.log(err); return false
      result(null,user_id)
      return
    })
    }
module.exports = Users;
