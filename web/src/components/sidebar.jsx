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
                  <li key={index} className={item.cName} id={window.location.pathname === item.path ? "active" : ""}>
                    <Link id="icon" to={item.path}>
                      {item.icon}
                      <span id="title">{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
      </nav>
    </>
  )
}