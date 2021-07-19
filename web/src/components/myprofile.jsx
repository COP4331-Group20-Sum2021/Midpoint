import SideBar from "./sidebar"
import "../styles/myprofile.scss";

export default function MyProfile() {
    return (
      <>
        <div className="container">
          <SideBar />
          <div className="profile-content">
            <div className="header">
              <h1>MY PROFILE</h1>
            </div>
          </div>
        </div>
      </>
    )
}