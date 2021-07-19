import SideBar from "./sidebar"
import "../styles/groups.scss";

export default function Groups() {
    return (
      <>
        <div className="container">
          <SideBar />
          <div className="groups-content">
            <div className="groups"><h1>GROUPS</h1></div>
          </div>
        </div>
      </>
    )
}