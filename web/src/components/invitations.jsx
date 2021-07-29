import React, { useEffect, useState } from "react";
import SideBar from "./sidebar"
import "../styles/invitations.scss";
import { useAuth } from "../contexts/authContext";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

export default function Invitations() {
  const { user } = useAuth();
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    // const intervalId = setInterval(() => {
      fetch('https://group20-midpoint.herokuapp.com/api/listinvites', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          userId : user.uid,
          userToken : user.Aa,
          email: user.email,
        })
    })
    .then(response => response.json())
    .then(data => {setInvitations(data.invitedata)})
    // }, 5000)
    
    // return() => clearInterval(intervalId);

  }, []);

  function acceptInvitation(index, id, gid)
  {
    fetch('https://group20-midpoint.herokuapp.com/api/acceptinvitation', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inviteId: id,
        userId : user.uid,
        userToken : user.Aa,
        email: user.email,
        groupId: gid,
        })
    })

    .then(response => {
      if (response.ok)
      {
        setInvitations(invitations.filter((invitation, i) => i !== index))
      }
    })
  }

  function declineInvitation(index, id)
  {
    fetch('https://group20-midpoint.herokuapp.com/api/declineinvitation', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          userId : user.uid,
          userToken : user.Aa,
          email: user.email,
          inviteId: id
        })
    })

    .then(response => {
      if (response.ok)
      {
        setInvitations(invitations.filter((invitation, i) => i !== index))
      }
    })
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
                <div className="table-style">
                <table className="invitations-table">
                  {invitations.length === 0 ? <thead><tr><th id="no-invitations" colSpan="2">No Invitations</th></tr></thead> : 
                    <thead>
                      <tr>
                        <th>GROUP NAME</th>
                        <th>FROM</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                  }
                  <tbody>
                      {invitations && invitations.map((invitation, i) =>{
                        return(
                          <tr key={i}>
                            <td>{invitation.groupname}</td>
                            <td>{invitation.from}</td>
                            <td align="center"><button id="accept-button" onClick={() => acceptInvitation(i, invitation.inviteId, invitation.groupId)}><CheckIcon id="check-icon"/>Accept</button></td>
                            <td align="center"><button id="decline-button" onClick={() => declineInvitation(i, invitation.inviteId)}><CloseIcon id="close-icon"/>Decline</button></td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
                </div>
              </div>
          </div>
        </div>
      </>
    )
}