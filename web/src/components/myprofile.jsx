import SideBar from "./sidebar"
import "../styles/myprofile.scss";

export default function MyProfile() {
    return (
      <>
        <SideBar />
        <div className="profile-content">
          <div className="map"><h1>myprofile</h1></div>
        </div>
      </>
    )
}