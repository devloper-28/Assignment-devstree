import React, { useState } from 'react';
import { LOGO, MAN } from '../../Assets';
import './layout.css';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const Layout = () => {
  const navigate = useNavigate();
  const profilePhoto = localStorage.getItem('profileImage');
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('profileImage');
    navigate('/login');
  };

  const handleOpenProfileModal = () => {
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  return (
    <>
      <div className="navbar">
        <div className="logo_nav">
          <img src={LOGO} alt="logo" />
        </div>
        <div>
          <div className="profile_person">
            <img src={profilePhoto || MAN} alt="man" className="avatar" />
            <p className="ml-2">{user?.fullName}</p>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <section>
        <div className="sidebar">
          <div>
            <h5 className="mt-2">Users</h5>
            <h5 className="mt-2" onClick={handleOpenProfileModal}>
              My Profile
            </h5>
            <h5 className="mt-2" onClick={handleLogout}>
              Logout
            </h5>
          </div>
        </div>
      </section>

      {/* Profile Modal */}
      <Modal show={showProfileModal} onHide={handleCloseProfileModal}>
        <Modal.Header>
          <Modal.Title>My Profile</Modal.Title>
           <button className="close" onClick={handleCloseProfileModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {/* Display user data here */}
          <img src={profilePhoto || MAN} alt="Profile" className="modal-profile-image" />

          <p><strong>Name:</strong> {user?.fullName}</p>
          <p><strong>Email: </strong>{user?.email}</p>
          <p><strong>Phone Number:</strong> {user?.phoneNumber}</p>
        </Modal.Body>
      
      </Modal>
    </>
  );
};

export default Layout;
