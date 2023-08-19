import React from 'react'
import Nav from "react-bootstrap/Nav";
import "../Home/home.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../Home/home';
import Add_project from '../Add/add_project';
import Projectlist from '../Add/projectlist';
import Addmilestone from '../Add/addmilestone';
import Addmodule from '../Add/addmodule';
import Addtask from '../Add/addtask';
import Tasklist from '../Add/tasklist';

const Header = () => {
  return (
    <div>
      <div>
        <Nav>
          <Nav.Item>
            <Nav.Link>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Admin</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Log Out</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add_project" element={<Add_project/>} />
            <Route path="/Project_list" element={<Projectlist/>} />
            <Route path="/Add_milestone" element={<Addmilestone/>} />
            <Route path="/Add_modules" element={<Addmodule/>} />
            <Route path="/Add_task" element={<Addtask/>} />
            <Route path="/Task_list" element={<Tasklist/>} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Header
