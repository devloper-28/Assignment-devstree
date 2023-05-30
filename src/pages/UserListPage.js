import React, { useState } from "react";
import Layout from "../components/user/Layout";
import "./users.css";
import { Table, Modal } from "react-bootstrap";
import { AVATAR, MAN } from "../Assets";

const UserListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Layout />
      <div className="main-section">
        <div>
          <Table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={user.profileImage || MAN}
                        alt="man"
                        className="b50 table_profile"
                      />
                      <p className="ml-2">{user.fullName}</p>
                    </div>
                  </td>
                  <td>
                    <div className="td_content">{user.fullName}</div>
                  </td>
                  <td>
                    <div className="td_content">{user.phoneNumber}</div>
                  </td>
                  <td>
                    <div
                      className="td_content view_btn"
                      onClick={() => handleViewUser(user)}
                    >
                      View
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
          <Modal.Title>User Details</Modal.Title>
          <button className="close" onClick={handleCloseModal}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <div className="d-flex align-items-center mb-3">
                <img
                  src={selectedUser.profileImage || MAN}
                  alt="man"
                  className="b50 modal_profile"
                />
              </div>
              <div>
                <strong>Name:</strong> {selectedUser.fullName}
              </div>
              <div>
                <strong>Email:</strong> {selectedUser.email}
              </div>
              <div>
                <strong>Phone Number:</strong> {selectedUser.phoneNumber}
              </div>
            </div>
          )}
        </Modal.Body>
     
      </Modal>
    </div>
  );
};

export default UserListPage;
