import React, { useState } from "react";
import "../styles/sidebar.scss";
import { Link } from "react-router-dom";
import { SidebarData } from "./sidebardata";

export default function SideBar() {
    return (
      <>
        <nav className="sidebar">
          <ul className="sidebar-items">
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </>
    )
}