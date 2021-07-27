import SideBar from "./sidebar"
import "../styles/invitations.scss";
import { useAuth } from "../contexts/authContext";



export default function Map() {
  const { user } = useAuth()
    return (
      <>
        <div className="container">
          <SideBar />
          <div className="invitations-content">
              <div className="invitations">
                <div className="title">
                    <h1>INVITATIONS</h1>
                </div>
              </div>
          </div>
        </div>
      </>
    )
}