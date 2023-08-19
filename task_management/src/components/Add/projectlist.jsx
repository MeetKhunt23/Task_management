import React, { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "./input.css";

const Projectlist = () => {
  const [projectlistdata, setprojectlistdata] = useState([]);
  

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

  useEffect(() => {
    projectlisting();
  }, []);
  return (
    <div className="tablelist">
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Projects
      </h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Project Name</th>
            <th>Total Milestone</th>
            <th>Total Module</th>
            <th>Added On</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projectlistdata.map((pro, index) => {
            return(
            <tr>
              <td>{index+1}</td>
              <td>{pro.project_name}</td>
              <td>{pro.total_milestone}</td>
              <td>{pro.total_module}</td>
              <td>{pro.Added_on}</td>
              <td>{pro.status}</td>
            </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Projectlist;
