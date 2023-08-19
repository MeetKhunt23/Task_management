import React, { useState } from "react";
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

const Add_project = () => {
  const [project, setproject] = useState("");

  const submitproject = async () => {
    var user_id = localStorage.getItem("user_id");
    var data = {
      user_id: user_id,
      project_name: project,
    };
    const res = await axios.post("http://localhost:1300/addproject", data);
    if (res.data.success === "yes") {
      NotificationManager.success("Project added Successfully.");
      document.getElementById("Project_name").value = "";
    }
  };


  return (
    <>
      <InputGroup className="mb-3 project_input">
        <InputGroup.Text id="inputGroup-sizing-default">
          Project Name
        </InputGroup.Text>
        {}
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          onChange={(e) => {
            setproject(e.target.value);
          }}
          id="Project_name"
        />
      </InputGroup>
      <button className="project_input2" onClick={() => submitproject()}>
        Submit
      </button>
      <NotificationContainer />
    </>
  );
};

export default Add_project;
