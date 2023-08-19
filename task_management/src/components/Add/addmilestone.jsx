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
import Multiselect from "multiselect-react-dropdown";

const Addmilestone = () => {
  const [Milestone, setMilestone] = useState("");
  // console.log("Milestone", Milestone);
  const [MultipleMilestone, setMultipleMilestone] = useState([]);
  // console.log("MultipleMilestone", MultipleMilestone);
  const [projectlistdata, setprojectlistdata] = useState([]);
  const [options, setoptions] = useState([]);
  const [Projectid, setProjectid] = useState([]);

  console.log("Projectid", Projectid);
  console.log("options", options);

  const submitproject = async (project_id) => {
    var user_id = localStorage.getItem("user_id");
    if (Milestone) {
      MultipleMilestone.push(Milestone);
    }
    var data = {
      user_id: user_id,
      milestone_name:
        MultipleMilestone.length > 0 ? MultipleMilestone : Milestone,
      project_id: Projectid,
    };
    const res = await axios.post("http://localhost:1300/addmilestone", data);
    if (res.data.success === "yes") {
      NotificationManager.success("Milestone added Successfully.");
      document.getElementById("milestone_name").value = "";
      setMultipleMilestone([]);
      // document.getElementsByClassName("milestoneinput").value = "";
      setMilestone("");
      //   document.getElementsByClassName("milestoneinput").reset();
    } else {
      NotificationManager.error(res.data.message);
    }
  };

  const projectlisting = async () => {
    var alloptions = [];
    var user_id = localStorage.getItem("user_id");
    var data = {
      user_id: user_id,
    };
    const res = await axios.post("http://localhost:1300/projectlisting", data);
    if (res.data.success === "yes") {
      // setprojectlistdata(res.data.data);
      for (let i = 0; i < res.data.data.length; i++) {
        // var obj={};
        // obj['label']=res.data.data[i].project_name
        // obj['value']=res.data.data[i].id
        // alloptions.push(obj)
        alloptions.push(res.data.data[i].project_name);
      }
      setoptions(alloptions);
    }
  };

  const handlemultiplemilestones = () => {
    // MultipleMilestone.push(Milestone);
    // setMilestone("");
    // document.getElementById("milestone_name").value = "";
    const abc = [...MultipleMilestone, []];
    setMultipleMilestone(abc);
  };

  const handlechange = (onChangeValue, index) => {
    const inputdata = [...MultipleMilestone];
    inputdata[index] = onChangeValue.target.value;
    setMultipleMilestone(inputdata);
  };

  useEffect(() => {
    projectlisting();
  }, []);

  return (
    <div className="addmilestone">
      {/* <Form.Select
        aria-label="Default select example"
        className="milestoneinput"
        onChange={(e) => setProjectid(e.target.value)}
      >
        <option defaultChecked>Select Project</option>
        {projectlistdata.map((pro, index) => {
          return (
            <option value={pro.id} className="milestoneinput">
              {pro.project_name}
            </option>
          );
        })}
      </Form.Select> */}
      <div>
        <Multiselect
          isObject={false}
          options={options}
          onChange={(e)=>setProjectid(e.target.value)}
          onRemove={(e) => {
            console.log(e);
          }}
          onSelect={(e) => {
            console.log(e);
          }}
        />
      </div>
      <div className="milestonewithadd">
        <InputGroup className="mb-3 milestoneinput ">
          <InputGroup.Text id="inputGroup-sizing-default">
            Milestone Name
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={(e) => {
              setMilestone(e.target.value);
            }}
            id="milestone_name"
          />
        </InputGroup>
        <span
          className="mb-3 milestoneinput addanothermilestone"
          onClick={() => handlemultiplemilestones()}
        >
          <BiMessageSquareAdd />
        </span>
      </div>
      {MultipleMilestone.map((item, index) => {
        return (
          <>
            <div className="milestonewithadd">
              <InputGroup className="mb-3 milestoneinput ">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Milestone Name
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => {
                    handlechange(e, index);
                  }}
                  id="milestone_name"
                />
              </InputGroup>
              {/* <span
                className="mb-3 milestoneinput addanothermilestone"
                onClick={() => handlemultiplemilestones()}
              >
                <BiMessageSquareAdd />
              </span> */}
            </div>
          </>
        );
      })}
      {/* <div style={{ marginLeft: "140px" }} className="multiplemilestone">
        {MultipleMilestone.map((pro) => {
          return (
            <Button
              variant="success"
              style={{ marginRight: "15px", marginBottom: "10px" }}
            >
              {pro}
            </Button>
          );
        })}
      </div> */}
      <button className="admilestonebtn" onClick={() => submitproject()}>
        Submit
      </button>
      <NotificationContainer />
    </div>
  );
};

export default Addmilestone;
