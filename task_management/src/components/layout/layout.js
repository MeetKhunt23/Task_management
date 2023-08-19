import React from 'react'
import Header from '../Header/header'
import Sidebar from '../Sidebar/sidebar'
import "./layout.css"

const Layout = (props) => {
  return (
    <div>
        <Header />
        <Sidebar/>
    </div>
  )
}

export default Layout
