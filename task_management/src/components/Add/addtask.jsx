import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./input.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useNavigate } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import axios from "axios";

const Addtask = () => {
  const [module_id, setmodule_id] = useState("");
  const [projectlistdata, setprojectlistdata] = useState([]);
  const [milestonelisting, setmilestonelisting] = useState([]);
  const [modulelisting, setmodulelisting] = useState([]);
  const [Projectid, setProjectid] = useState("");
  const [milestone_id, setmilestone_id] = useState("");
  const [task, setTask] = useState("");
//   console.log("task",task);
  const [Hours, sethours] = useState("");
//   console.log("Hours",Hours);
  const [Minutes, setminutes] = useState("");
//   console.log("Minutes",Minutes);
  const [priority, setpriority] = useState("");
  console.log("priority",priority);
//   var time=`${Hours}:${Minutes}`
//   console.log("time",time);


  const submittask = async (project_id) => {
    var user_id = localStorage.getItem("user_id");
    var data = {
      user_id: user_id,
      project_id: Projectid,
      milestone_id: milestone_id,
      module_id: module_id,
      task:task,
      estimated_time:`${Hours}:${Minutes}`,
      priority:priority
    };
    const res = await axios.post("http://localhost:1300/addtask", data);
    if (res.data.success === "yes") {
      NotificationManager.success("Module added Successfully.");
      document.getElementById("task").value = "";
      // setProjectid("");
      // setmilestone_id("");
    }
  };

  const projectlisting = async () => {
    var user_id = localStorage.getItem("user_id");
    var data = {
      user_id: user_id,
    };
    const res = await axios.post("http://localhost:1300/projectlisting", data);
    if (res.data.success === "yes") {
      setprojectlistdata(res.data.data);
    }
  };

  const Milestonelisting = async () => {
    var user_id = localStorage.getItem("user_id");
    var data = {
      user_id: user_id,
      project_id: Projectid,
    };
    const res = await axios.post(
      "http://localhost:1300/milestonelisting",
      data
    );
    if (res.data.success === "yes") {
      setmilestonelisting(res.data.data);
    }
  };

  const Modulelising =async()=>{
    var user_id = localStorage.getItem("user_id");
    var data = {
      user_id: user_id,
      project_id: Projectid,
      milestone_id:milestone_id
    };
    const res = await axios.post(
      "http://localhost:1300/modulelisting",
      data
    );
    if (res.data.success === "yes") {
        setmodulelisting(res.data.data);
    }
  }


  useEffect(() => {
    projectlisting();
  }, []);

  useEffect(() => {
    Milestonelisting();
  }, [Projectid]);

  useEffect(() => {
    Modulelising();
  }, [milestone_id]);

  var hours = [];
  for (let index = 1; index < 25; index++) {
    hours.push(index);
  }

  var minutes = [];
  for (let index = 1; index < 61; index++) {
    minutes.push(index);
  }

  return (
    <div className="addmilestone">
      <Form.Select
        aria-label="Default select example"
        className="milestoneinput"
        onClick={(e) => setProjectid(e.target.value)}
      >
        <option className="milestoneinput">Select Project</option>
        {projectlistdata.map((pro, index) => {
          return (
            <option value={pro.id} className="milestoneinput">
              {pro.project_name}
            </option>
          );
        })}
      </Form.Select>
      <Form.Select
        aria-label="Default select example"
        className="milestoneinput"
        onChange={(e) => setmilestone_id(e.target.value)}
      >
        <option className="milestoneinput" defaultChecked>
          Select Milestone
        </option>
        {milestonelisting.map((pro, index) => {
          return (
            <option value={pro.id} className="milestoneinput">
              {pro.milestone_name}
            </option>
          );
        })}
      </Form.Select>
      <Form.Select
        aria-label="Default select example"
        className="milestoneinput"
        onChange={(e) => setmodule_id(e.target.value)}
      >
        <option className="milestoneinput" defaultChecked>
          Select Module
        </option>
        {modulelisting.map((pro, index) => {
          return (
            <option value={pro.id} className="milestoneinput">
              {pro.module_name}
            </option>
          );
        })}
      </Form.Select>
      <Form.Group className="mb-3"  controlId="exampleForm.ControlTextarea1">
        <Form.Label>Task</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={(e)=>setTask(e.target.value)} id="task"/>
      </Form.Group>
      <div>
        <span> Estimated Time</span>
        <Form.Select
          aria-label="Default select example"
          className="estimatedtime milestoneinput"
          onChange={(e)=>sethours(e.target.value)}
        >
          {hours.map((pro, index) => {
            return <option value={pro}>{pro}</option>;
          })}
        </Form.Select>
        <Form.Select
          aria-label="Default select example"
          className="estimatedtime milestoneinput"
          onChange={(e)=>setminutes(e.target.value)}
        >
           {minutes.map((pro, index) => {
            return <option value={pro}>{pro}</option>;
          })}
        </Form.Select>
      </div>
      <Form.Select
        aria-label="Default select example"
        className="estimatedtime milestoneinput"
        onChange={(e)=>setpriority(e.target.value)}
      >
        <option>Select Priority</option>
        <option value="1">Ergent</option>
        <option value="2">Moderate</option>
        <option value="3">least Prior</option>
      </Form.Select>
      <button className="addtaskbtn" onClick={() => submittask()}>
        Submit
      </button>
      <NotificationContainer />
    </div>
  );
};

export default Addtask;
