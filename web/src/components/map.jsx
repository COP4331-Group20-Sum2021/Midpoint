import SideBar from "./sidebar"
import "../styles/map.scss";
import { useAuth } from "../contexts/authContext";



export default function Map() {
  const { user } = useAuth()
    return (
      <>
        <div className="container">
          <SideBar />
          <div className="map-content">



            <div className="map"><h1>MAP</h1></div>
            <div className="map-frame">
              this is the map-frame
            </div>
            <div className="point-list">
              this is the point list
            </div>

            <table className="member-list">
              <tr>this is my member list</tr>
            </table>


          </div>
        </div>
      </>
    )
}