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
import { BiMessageSquareAdd } from "react-icons/bi";
import Button from "react-bootstrap/Button";

const Addmodule = () => {
  const [Module, setModule] = useState("");
  const [projectlistdata, setprojectlistdata] = useState([]);
  const [milestonelisting, setmilestonelisting] = useState([]);
  const [MultipleModules, setMultipleModules] = useState([]);
  const [Projectid, setProjectid] = useState("");
  const [milestone_id, setmilestone_id] = useState("");
  console.log("milestone_id", milestone_id);
  console.log("Projectid", Projectid);

  const submitproject = async (project_id) => {
    var user_id = localStorage.getItem("user_id");
    if (Module) {
      MultipleModules.push(Module);
    }
    var data = {
      user_id: user_id,
      module_name:MultipleModules.length > 0 ? MultipleModules : Module,
      project_id: Projectid,
      milestone_id: milestone_id,
    };
    const res = await axios.post("http://localhost:1300/addmodule", data);
    if (res.data.success === "yes") {
      NotificationManager.success("Module added Successfully.");
      document.getElementById("module_name").value = "";
      setMultipleModules([])
      setModule("")
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
      setmilestone_id(res.data.data[0].id);
    }
  };

  const handlemilstone = (e) => {
    Milestonelisting();
    setmilestone_id(e.target.value);
    // alert(`${e.target.value}`)
  };

  useEffect(() => {
    projectlisting();
  }, []);


  const handlemultiplemodules=()=>{
    MultipleModules.push(Module);
    setModule("");
    document.getElementById("module_name").value = "";
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
        onClick={(e) => handlemilstone(e)}
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
      <div className="milestonewithadd">
        <InputGroup className="mb-3 milestoneinput ">
          <InputGroup.Text id="inputGroup-sizing-default">
            Module Name
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => {
              setModule(e.target.value);
            }}
            id="module_name"
          />
        </InputGroup>
        <span
          className="mb-3 milestoneinput addanothermilestone"
          onClick={() => handlemultiplemodules()}
        >
          <BiMessageSquareAdd />
        </span>
      </div>
      <div style={{ marginLeft: "140px" }} className="multiplemilestone">
        {MultipleModules.map((pro) => {
          return (
            <Button
              variant="success"
              style={{ marginRight: "15px", marginBottom: "10px" }}
            >
              {pro}
            </Button>
          );
        })}
      </div>
      <button className="admilestonebtn" onClick={() => submitproject()}>
        Submit
      </button>
      <NotificationContainer />
    </div>
  );
};

export default Addmodule;
