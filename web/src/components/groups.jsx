import SideBar from "./sidebar"
import "../styles/groups.scss";

export default function Groups() {
    return (
      <>
        <SideBar />
        <div className="groups-content">
          <div className="map"><h1>groups</h1></div>
        </div>
      </>
    )
}