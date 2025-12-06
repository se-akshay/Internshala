import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../features/users/usersSlice";
import UsersTable from "../components/UsersTable";
import UserForm from "../components/UserForm";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleAddOrUpdateUser = (userData) => {
    if (isEditing) {
      dispatch(updateUser(userData));
      setIsEditing(false);
      setSelectedUser(null);
    } else {
      dispatch(addUser(userData));
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
      // Clear form if deleted user was being edited
      if (isEditing && selectedUser?.id === userId) {
        setIsEditing(false);
        setSelectedUser(null);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedUser(null);
  };

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2c3e50",
          marginBottom: "30px",
          fontSize: "36px",
        }}
      >
        User Management Dashboard
      </h1>

      {status === "loading" && <Loader />}

      {status === "failed" && <ErrorMessage message={error} />}

      {status === "succeeded" && (
        <>
          <UserForm
            onSubmit={handleAddOrUpdateUser}
            initialValues={selectedUser}
            isEditing={isEditing}
          />

          {isEditing && (
            <button
              onClick={handleCancelEdit}
              style={{
                backgroundColor: "#95a5a6",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              Cancel Edit
            </button>
          )}

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#2c3e50" }}>
              Users List ({users.length})
            </h2>
            <UsersTable
              users={users}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
