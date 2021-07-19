import SideBar from "./sidebar"
import "../styles/map.scss";

export default function Map() {
    return (
      <>
        <div className="container">
          <SideBar />
          <div className="map-content">
            <div className="map"><h1>MAP</h1></div>
          </div>
        </div>
      </>
    )
}