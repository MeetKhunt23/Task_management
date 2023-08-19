import React, { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { FaRegPauseCircle } from "react-icons/fa";
import { BsPlayCircle } from "react-icons/bs";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GoTasklist } from "react-icons/go";


const Tasklist = () => {
  const [tasklistdata, settasklistdata] = useState([]);

  const Tasklisting = async () => {
    var user_id = localStorage.getItem("user_id");
    var data = {
      user_id: user_id,
    };
    const res = await axios.post("http://localhost:1300/tasklisting", data);
    if (res.data.success === "yes") {
      settasklistdata(res.data.data);
    }
  };

  const handlepause = async (task_id) => {
    var data = {
      task_id: task_id,
    };
    const res = await axios.post("http://localhost:1300/pausethetask", data);
    if (res.data.success === "yes") {
      NotificationManager.success("Task Paused...!");
      Tasklisting();
    }
  };

  const handleresume = async (task_id) => {
    var data = {
      task_id: task_id,
    };
    const res = await axios.post("http://localhost:1300/resumetask", data);
    if (res.data.success === "yes") {
      NotificationManager.success("Task Resumed...!");
      Tasklisting();
    }
  };

  const handledone = async (task_id) => {
    var data = {
      task_id: task_id,
    };
    const res = await axios.post("http://localhost:1300/taskdone", data);
    if (res.data.success === "yes") {
      NotificationManager.success("Task Completed...!");
    //   document.getElementById("pauseandresumebtns").style.display = "none";
      Tasklisting();
    }
  };

  useEffect(() => {
    Tasklisting();
  }, []);
  return (
    <div>
      <div className="tablelist">
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          All Tasks
        </h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Task</th>
              <th>Project Name</th>
              <th>Estimate Hours</th>
              <th>Taken Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasklistdata.map((pro, index) => {
              return (
                <tr>
                  <td>{pro.task}</td>
                  <td>{pro.project_name}</td>
                  <td>{pro.estimated_time}</td>
                  <td>{pro.taken_hours}</td>
                  <td>
                    {pro.status == 2 ? (
                      <div>
                        <GoTasklist
                          style={{
                            fontSize: "35px",
                            marginLeft: "45px",
                            cursor: "pointer",
                          }}
                          onClick={() => handledone(pro.id)}
                        />
                      </div>
                    ) : (
                      <div className="statusicons">
                        <div>
                          {pro.status == 0 ? (
                            <FaRegPauseCircle
                              style={{
                                fontSize: "30px",
                                marginLeft: "20px",
                                cursor: "pointer",
                                color:"green"
                              }}
                              onClick={() => handlepause(pro.id)}
                              id="pauseandresumebtns"
                            />
                          ) : (
                            <BsPlayCircle
                              style={{
                                fontSize: "30px",
                                marginLeft: "20px",
                                cursor: "pointer",
                                color:"green"
                              }}
                              id="pauseandresumebtns"
                              onClick={() => handleresume(pro.id)}
                            />
                          )}
                        </div>
                        <div>
                          <IoMdCheckmarkCircleOutline
                            style={{
                              fontSize: "35px",
                              marginLeft: "20px",
                              cursor: "pointer",
                              color:"blue"
                            }}
                            onClick={() => handledone(pro.id)}
                          />
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Tasklist;
