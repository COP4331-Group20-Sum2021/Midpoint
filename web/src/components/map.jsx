import SideBar from "./sidebar"
import "../styles/map.scss";

export default function Map() {
    return (
      <>
        <SideBar />
        <div className="map-content">
          <div className="map"><h1>map</h1></div>
        </div>
      </>
    )
}