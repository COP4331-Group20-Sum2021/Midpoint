import * as React from "react";
import ReactDom from "react-dom";
import { Link, useLocation } from "react-router-dom";
import Groups from "./groups";
import "../styles/modal.scss";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
  width: 500,
  height: 500,
  textAlign: "center",
  borderRadius: "1em",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function Modal({ open, children, onClose, crud, create, del, edit, kick, leave, info, add, setPage, invalidate }) {
  console.log(setPage);
  if (!open) return null;
  // CREATE
  else if (crud === 1)
    return ReactDom.createPortal(
      <>
        <div style={OVERLAY_STYLES} />
        <div className="create-modal">
          <h1>Create a New Group</h1>
          <div className="group-name">
            <label for="gname">Group Name</label>
            <input type="text" id="gname" name="gname" />
          </div>

          <div className="modal-buttons">
            <button
              id="confirm-button-modal"
              onClick={() => {
                onClose();
                create(document.getElementById("gname").value);
              }}
            >
              Confirm
            </button>
            <button id="cancel-button-modal" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </>,
      document.getElementById("portal")
    );
  // DELETE
  if (crud === 2)
    return ReactDom.createPortal(
      <>
        <div style={OVERLAY_STYLES} />
        <div className="create-modal">
          <h1>Are you sure you want to delete this group?</h1>
          <div className="modal-buttons">
            <Link to="/myprofile">
              <button id="confirm-button-modal"
                onClick={() => {
                  onClose();
                  del(info);
                  invalidate();
                  setPage(<Groups setPage={setPage} />);
                }}
              >
                Confirm
              </button>
            </Link>
            <button id="cancel-button-modal" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </>,
      document.getElementById("portal")
    );
  // EDIT
  if (crud === 3)
    return ReactDom.createPortal(
      <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
          <div>Edit the current group</div>
          <label for="group">Group Name:</label>
          <input type="text" id="gname" name="gname" />
          <button
            onClick={() => {
              onClose();
              edit(info, document.getElementById("gname").value);
            }}
          >
            Confirm
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </>,
      document.getElementById("portal")
    );
  // KICK
  if (crud === 4)
    return ReactDom.createPortal(
      <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
          <div>Choose who you want to kick</div>
          <button
            onClick={() => {
              onClose();
              kick(info);
            }}
          >
            Confirm
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </>,
      document.getElementById("portal")
    );
  // LEAVE
  if (crud === 5)
    return ReactDom.createPortal(
      <>
        <div style={OVERLAY_STYLES} />
        <div className="create-modal">
          <h1>Are you sure you want to leave the group?</h1>
          <div className="modal-buttons">
            <Link to="/myprofile">
              <button
                id="confirm-button-modal"
                onClick={() => {
                  console.log("testing info");
                  console.log(info.groupid);
                  onClose();
                  leave(info);
                  invalidate();
                  setPage(<Groups setPage={setPage} />);
                }}
              >
                Confirm
              </button>
            </Link>

            <button id="cancel-button-modal" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </>,
      document.getElementById("portal")
    );
  if (crud === 6)
    return ReactDom.createPortal(
      <>
        <div style={OVERLAY_STYLES} />
        <div className="create-modal">
          <h1>Add a new member</h1>
          <div className="group-name">
            <label for="memEmail">Member Email</label>
            <input type="text" id="memEmail" name="memEmail" />
          </div>

          <div className="modal-buttons">
            <button
              id="confirm-button-modal"
              onClick={() => {
                onClose();
                add(info, document.getElementById("memEmail").value);
              }}
            >
              Confirm
            </button>
            <button id="cancel-button-modal" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </>,
      document.getElementById("portal")
    );
}
