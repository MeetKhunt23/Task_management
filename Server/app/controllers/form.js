const Form = require("../models/form.js");

exports.addformdata = (req, res) => {
  const {
    user_id,
    field_type,
    field_label,
    placeholder,
    options,
    form_number,
  } = req.body;
  let errors = "";
  if (!user_id) {
    errors = "user_id is required.";
  } else if (!field_type) {
    errors = "field_type is required.";
  } else if (!field_label) {
    errors = "field_label is required.";
  } else if (!placeholder) {
    errors = "placeholder is required.";
  } else if (!options) {
    errors = "options is required.";
  } else if (!form_number) {
    errors = "form_number is required.";
  }

  // console.log(milestone_name); return false

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Form.addformdata(
    user_id,
    field_type,
    field_label,
    placeholder,
    options,
    form_number,
    (err, data) => {
      if (data) {
        return res.send({
          success: "yes",
          message: "Form data Added",
          data: data,
        });
      }
    }
  );
};

exports.formlisting = (req, res) => {
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

  Form.formlisting(user_id, (err, data) => {
    if (data) {
      return res.send({
        success: "yes",
        message: "Here is list of form Fields",
        data: data,
      });
    }
  });
};

exports.deleteallfields = (req, res) => {
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

  Form.deleteallfieldofuser(user_id, (err, data) => {
    if (data) {
      return res.send({
        success: "yes",
        message: "All Fiels are deleted.",
        data: [],
      });
    }
  });
};

exports.deletebycomponentid = (req, res) => {
  const { component_id, user_id } = req.body;
  let errors = "";
  if (!component_id) {
    errors = "component_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Form.deletecomponentbyid(component_id, user_id, (err, data) => {
    if (data) {
      return res.send({
        success: "yes",
        message: "component deleted Successfully.",
        data: data,
      });
    }
  });
};

exports.deletefieldfrommyforms=(req,res)=>{
  const { component_id, user_id,form_id } = req.body;
  let errors = "";
  if (!component_id) {
    errors = "component_id is required.";
  }else if (!user_id) {
    errors = "user_id is required.";
  }else if (!form_id) {
    errors = "form_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Form.deletecomponentbyid(component_id, user_id, (err, data) => {
   Form.getallformupdatesids(user_id, form_id, (err, dataa) => {
    if (dataa) {
      var alldata = dataa;
      var array = [];
      alldata.forEach((pro) => {
        array.push(pro.id);
      });
      var allids = array.join(",");
      // console.log(allids);  return false
      Form.updateintoformlist(user_id, allids, form_id, (err, formid) => {
        if (formid) {
          return res.send({
            success: "yes",
            message: "Field deleted Successfully...!",
            data: formid,
          });
        }
      });
    }
  });
  });


}

exports.updateformdata = (req, res) => {
  const { component_id, user_id, field_label, placeholder, options } = req.body;
  let errors = "";
  if (!component_id) {
    errors = "component_id is required.";
  } else if (!user_id) {
    errors = "user_id is required.";
  } else if (!field_label) {
    errors = "field_label is required.";
  } else if (!placeholder) {
    errors = "placeholder is required.";
  } else if (!options) {
    errors = "options is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Form.updateform(
    component_id,
    user_id,
    field_label,
    placeholder,
    options,
    (err, data) => {
      if (data) {
        return res.send({
          success: "yes",
          message: "Updated Successfully.",
          data: [],
        });
      }
    }
  );
};

exports.saveform = (req, res) => {
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

  Form.getallformfilds(user_id, (err, dataa) => {
    if (dataa) {
      var alldata = dataa;
      var array = [];
      alldata.forEach((pro) => {
        array.push(pro.id);
      });
      var allids = array.join(",");
      // console.log(allids);  return false
      Form.insertintoformlist(user_id, allids, (err, formid) => {
        var form_id = formid;
        Form.updateformid(user_id, form_id, (err, data) => {
          if (data) {
            return res.send({
              success: "yes",
              message: "Form Saved...!",
              data: data,
            });
          }
        });
      });
    }
  });
};

exports.getformdetails = (req, res) => {
  const { form_id, user_id } = req.body;
  let errors = "";
  if (!form_id) {
    errors = "form_id is required.";
  } else if (!user_id) {
    errors = "user_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Form.getformdetailsbyid(form_id, user_id, (err, data) => {
    if (data) {
      return res.send({
        success: "yes",
        message: "here are all details of form",
        data: data,
      });
    }
  });
};

exports.getformsofuser = (req, res) => {
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

  Form.getallformsofuser(user_id, (err, data) => {
    if (data) {
      return res.send({
        success: "yes",
        message: "here is list of all forms",
        data: data,
      });
    }
  });
};

exports.deleteformofuser = (req, res) => {
  const { user_id, form_id } = req.body;
  let errors = "";
  if (!user_id) {
    errors = "user_id is required.";
  } else if (!form_id) {
    errors = "form_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Form.deletefromallforms(form_id, user_id, (err, allformdata) => {
    if (allformdata) {
      Form.deletefromformdata(form_id, user_id, (err, data) => {
        if (data) {
          return res.send({
            success: "yes",
            message: "Form Deleted Successfully.!!",
            data: [],
          });
        }
      });
    }
  });
};

exports.updateformbyuser = (req, res) => {
  const { user_id, form_id } = req.body;
  let errors = "";
  if (!user_id) {
    errors = "user_id is required.";
  } else if (!form_id) {
    errors = "form_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Form.getallformupdatesids(user_id, form_id, (err, dataa) => {
    if (dataa) {
      var alldata = dataa;
      var array = [];
      alldata.forEach((pro) => {
        array.push(pro.id);
      });
      var allids = array.join(",");
      // console.log(allids);  return false
      Form.updateintoformlist(user_id, allids, form_id, (err, formid) => {
        Form.updatevalidation(form_id,user_id,(err,data)=>{
          if (data) {
            return res.send({
              success: "yes",
              message: "Form Saved...!",
              data: formid,
            });
          }
        })
      });
    }
  });
};


exports.updatevalidation=(req,res)=>{
  const { user_id, form_id } = req.body;
  let errors = "";
  if (!user_id) {
    errors = "user_id is required.";
  } else if (!form_id) {
    errors = "form_id is required.";
  }

  if (errors.length > 0) {
    return res.send({
      success: "no",
      message: errors,
      data: [],
    });
  }

  Form.updatevalidation(form_id,user_id,(err,data)=>{
    if(data){
      return res.send({
        success: "yes",
        message: "Updated",
        data: [],
      });
    }
  })
}

