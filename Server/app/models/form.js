const sql = require("./db.js");

const Form = function (form) {
  this.user_id = form.user_id;
  this.field_type = form.field_type;
  this.field_label = form.field_label;
  this.placeholder = form.placeholder;
  this.options = form.options;
};

Form.addformdata = (
  user_id,
  field_type,
  field_label,
  placeholder,
  options,
  form_number,
  result
) => {
  sql.query(
    `INSERT INTO form_data SET user_id=?,field_type=?,field_label=?,placeholder=?,options=?,form_number=?`,
    [user_id, field_type, field_label, placeholder, options,form_number],
    (err, res) => {
      result(null, res.insertId);
      return;
    }
  );
};

Form.formlisting = (user_id, result) => {
  sql.query(
    `SELECT * FROM form_data WHERE user_id=? AND form_number="null"`,
    [user_id],
    (err, res) => {
      result(null, res);
      return;
    }
  );
};

Form.deleteallfieldofuser = (user_id, result) => {
  sql.query(`DELETE FROM form_data WHERE user_id=? AND form_number=?`, [user_id,"null"], (err, res) => {
    result(null, user_id);
    return;
  });
};

Form.deletecomponentbyid = (component_id, user_id, result) => {
  sql.query(
    `DELETE FROM form_data WHERE id=? AND user_id=?`,
    [component_id, user_id],
    (err, res) => {
      result(null, component_id);
      return;
    }
  );
};

Form.updateform = (
  component_id,
  user_id,
  field_label,
  placeholder,
  options,
  result
) => {
  sql.query(
    `UPDATE form_data SET field_label=?,placeholder=?,options=? WHERE id=? AND user_id=?`,
    [field_label, placeholder, options, component_id, user_id],
    (err, res) => {
      result(null, component_id)
      return
    }
  );
};

Form.getallformfilds=(user_id,result)=>{
sql.query(`SELECT * FROM form_data WHERE user_id=? AND form_number=?`,[user_id,"null"],(err,res)=>{
  result(null,res)
  return
})
}

Form.insertintoformlist=(user_id,array,result)=>{
sql.query(`INSERT INTO allforms SET user_id=?,field_ids=?`,[user_id,array],(err,res)=>{
  // console.log(err); return false
  result(null,res.insertId)
  return
})
}

Form.updateformid=(user_id, form_id,result)=>{
sql.query(`UPDATE form_data SET form_number=? WHERE user_id=? AND form_number=?`,[form_id,user_id,"null"],(err,res)=>{
  result(null,form_id)
  return
})
}

Form.getformdetailsbyid=(form_id,user_id,result)=>{
sql.query(`SELECT * FROM form_data WHERE form_number=? AND user_id=?`,[form_id,user_id],(err,res)=>{
  // console.log(res); return false
  result(null,res)
  return
})
}

Form.getallformsofuser=(user_id,result)=>{
  sql.query(`SELECT * FROM allforms WHERE user_id=?`,[user_id],(err,res)=>{
    result(null,res)
    return
  })
}

Form.deletefromallforms=(form_id,user_id,result)=>{
sql.query(`DELETE FROM allforms WHERE id=? AND user_id=?`,[form_id,user_id],(err,res)=>{
  // console.log(err); return false
  result(null,form_id)
  return
})
}

Form.deletefromformdata=(form_id,user_id,result)=>{
sql.query(`DELETE FROM form_data WHERE form_number=? AND user_id=?`,[form_id,user_id],(err,res)=>{
  result(null,form_id)
  return
})
}

Form.getallformupdatesids=(user_id,form_id,result)=>{
sql.query(`SELECT * FROM form_data WHERE form_number=? AND user_id=?`,[form_id,user_id],(err,res)=>{
  result(null,res)
  return
})
}

Form.updateintoformlist=(user_id,allids,form_id,result)=>{
sql.query(`UPDATE allforms SET field_ids=? WHERE user_id=? AND id=?`,[allids,user_id,form_id],(err,res)=>{
  // console.log(res); return false
  result(null,form_id)
  return
})
}

Form.updatevalidation=(form_id,user_id,result)=>{
sql.query(`UPDATE form_data SET validated=0 WHERE form_number=? AND user_id=?`,[form_id,user_id],(err,res)=>{
  result(null,form_id)
  return
})
}

module.exports = Form;
