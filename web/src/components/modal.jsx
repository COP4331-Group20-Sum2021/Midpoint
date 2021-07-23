import * as React from 'react'
import ReactDom from 'react-dom'


const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000,
    width: 500,
    height: 500,
    textAlign: 'center',
    borderRadius: '1em',
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7',
    zIndex: 1000,
}

export default function Modal({ open, children, onClose, crud, create, del, edit, kick, leave }) {
    
    if (!open) return null
    else
    // CREATE
    if (crud === 1)
    return ReactDom.createPortal(
        <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
            <div>Create a new group</div>
            <label for="group">Group Name:</label>
            <input type="text" id="gname" name="gname" />
            <button onClick={() => {
                onClose()
                create(document.getElementById("gname").value)
            }}>Confirm</button>
            <button onClick={onClose}>Cancel</button>
            
        </div>
        </>,
        document.getElementById('portal')
    )
    // DELETE
    if (crud === 2)
    return ReactDom.createPortal(
        <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
            <div>Are you sure you want to delete this group?</div>
            <button onClick={() => {
                onClose()
                del()
            }}>Confirm</button>
            <button onClick={onClose}>Cancel</button>
            
        </div>
        </>,
        document.getElementById('portal')
    )
    // EDIT
    if (crud === 3)
    return ReactDom.createPortal(
        <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
            <div>Edit the current group</div>
            <label for="group">Group Name:</label>
            <input type="text" id="gname" name="gname" />
            <button onClick={() => {
                onClose()
                edit()
            }}>Confirm</button>
            <button onClick={onClose}>Cancel</button>
            
        </div>
        </>,
        document.getElementById('portal')
    )
    // KICK
    if (crud === 4)
    return ReactDom.createPortal(
        <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
            <div>Choose who you want to kick</div>
            <button onClick={() => {
                onClose()
                kick()
            }}>Confirm</button>
            <button onClick={onClose}>Cancel</button>
            
        </div>
        </>,
        document.getElementById('portal')
    )
    // LEAVE
    if (crud === 5)
    return ReactDom.createPortal(
        <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
            <div>Are you sure you want to leave the group?</div>
            <button onClick={() => {
                onClose()
                leave()
            }}>Confirm</button>
            <button onClick={onClose}>Cancel</button>
            
        </div>
        </>,
        document.getElementById('portal')
    )
}