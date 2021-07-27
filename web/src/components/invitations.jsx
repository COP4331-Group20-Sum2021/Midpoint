import React, { useEffect, useState } from "react";
import SideBar from "./sidebar"
import "../styles/invitations.scss";
import { useAuth } from "../contexts/authContext";
import { getDynamicStyles } from "jss";



export default function Invitations() {
  const { user } = useAuth();
  const [invitations, setInvitations] = useState([
    {
      email: "test@gmail.com"
    },
    {
      email: "test@gmail.com"
    }
  ]);

  // useEffect(() => {
  //   fetch('https://group20-midpoint.herokuapp.com/api/listinvites', {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //         userId : user.uid,
  //         userToken : user.Aa,
  //         email: user.email,
  //       })
  //   })
  //   .then(response => response.json())
  //   .then(data => {console.log(data);setInvitations(data.invitedata)})
  // }, []);

  function acceptInvitation()
  {
    console.log("invitation accepted :)");
  }

  function denyInvitation()
  {
    console.log("invitation denied :(");
  }

    return (
      <>
        <div className="container">
          <SideBar />
          <div className="invitations-content">
              <div className="invitations">
                <div className="title">
                    <h1>INVITATIONS</h1>
                </div>
                <table className="invitations-table">
                  <tr>
                    <th>From</th>
                    <th>Group Name</th>
                    <th></th>
                    <th></th>
                  </tr>
                    {invitations.length === 0 && <tr>No Invitations.</tr>}
                    {invitations && invitations.map(invitation =>{
                      return(
                      <tr>
                        <td>{invitation.email}</td>
                        <td>test</td>
                        <td><button onClick={acceptInvitation}>Accept</button></td>
                        <td><button onClick={denyInvitation}>Deny</button></td>
                      </tr>)
                    })} 
                </table>
              </div>
          </div>
        </div>
      </>
    )
}