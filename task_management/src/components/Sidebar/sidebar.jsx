import React from "react";
import { useState, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import "../Home/home.css";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import "../Home/home.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Home/home';
import Add_project from '../Add/add_project';
import Projectlist from '../Add/projectlist';
import Addmilestone from '../Add/addmilestone';
import Addmodule from '../Add/addmodule';
import Addtask from '../Add/addtask';
import Tasklist from '../Add/tasklist';

const Sidebar = () => {
  const [open1, setOpen1] = useState(
    localStorage.getItem("opened_1" === true) ? true : false
  );
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const onChangeInput1 = useCallback(
    (e) => {
      setOpen1(!open1);
      setOpen2(false);
      setOpen3(false);
    },
    [open1]
  );
  const onChangeInput2 = useCallback(
    (e) => {
      setOpen2(!open2);
      setOpen3(false);
      setOpen1(false);
    },
    [open2]
  );
  const onChangeInput3 = useCallback(
    (e) => {
      setOpen3(!open3);
      setOpen1(false);
      setOpen2(false);
    },
    [open3]
  );
  return (
    <>
      <div className="sidebarmenu">
        <div className="sidebaritems">
          <Button
            onClick={(e) => onChangeInput1(e)}
            aria-controls="example-collapse-text"
            aria-expanded={open1}
            className="sidebarmenubtns"
          >
            Project Management
          </Button>
          <Collapse in={open1}>
            <ul>
              <li
                onClick={() => {
                  window.location.href = "/add_project";
                }}
              >
                Add Project
              </li>
              <li
                onClick={() => {
                  window.location.href = "/Project_list";
                }}
              >
                Project List
              </li>
            </ul>
          </Collapse>
        </div>
        <div className="sidebaritems">
          <Button
            onClick={() => onChangeInput3()}
            aria-controls="example-collapse-text"
            aria-expanded={open3}
            className="sidebarmenubtns"
          >
            Project Management
          </Button>
          <Collapse in={open3}>
            <ul>
              <li
                onClick={() => {
                  window.location.href = "/Add_milestone";
                }}
              >
                Add Milestone
              </li>
              <li
                onClick={() => {
                  window.location.href = "/Add_modules";
                }}
              >
                Add Module
              </li>
            </ul>
          </Collapse>
        </div>
        <div className="sidebaritems">
          <Button
            onClick={() => onChangeInput2()}
            aria-controls="example-collapse-text"
            aria-expanded={open2}
            className="sidebarmenubtns"
          >
            Task Management
          </Button>
          <Collapse in={open2}>
            <ul>
              <li
                onClick={() => {
                  window.location.href = "/Add_task";
                }}
              >
                Add Task
              </li>
              <li
                onClick={() => {
                  window.location.href = "/Task_list";
                }}
              >
                Task List
              </li>
            </ul>
          </Collapse>
        </div>
      </div>
      {/* <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add_project" element={<Add_project/>} />
            <Route path="/Project_list" element={<Projectlist/>} />
            <Route path="/Add_milestone" element={<Addmilestone/>} />
            <Route path="/Add_modules" element={<Addmodule/>} />
            <Route path="/Add_task" element={<Addtask/>} />
            <Route path="/Task_list" element={<Tasklist/>} />
          </Routes>
        </BrowserRouter> */}
    </>
  );
};

export default Sidebar;
