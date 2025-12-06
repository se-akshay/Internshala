const UsersTable = ({ users, onEdit, onDelete }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#3498db", color: "white" }}>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Username</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>Phone</th>
            <th style={tableHeaderStyle}>Website</th>
            <th style={tableHeaderStyle}>Company Name</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
              }}
            >
              <td style={tableCellStyle}>{user.id}</td>
              <td style={tableCellStyle}>{user.name}</td>
              <td style={tableCellStyle}>{user.username}</td>
              <td style={tableCellStyle}>{user.email}</td>
              <td style={tableCellStyle}>{user.phone}</td>
              <td style={tableCellStyle}>{user.website}</td>
              <td style={tableCellStyle}>{user.company?.name || "N/A"}</td>
              <td style={tableCellStyle}>
                <button
                  onClick={() => onEdit(user)}
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#2ecc71",
                    marginRight: "5px",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#e74c3c",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {users.length === 0 && (
        <div style={{ textAlign: "center", padding: "20px", color: "#999" }}>
          No users found.
        </div>
      )}
    </div>
  );
};

const tableHeaderStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
  fontWeight: "bold",
};

const tableCellStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  color: "#333",
};

const buttonStyle = {
  padding: "6px 12px",
  border: "none",
  borderRadius: "4px",
  color: "white",
  cursor: "pointer",
  fontSize: "14px",
  transition: "opacity 0.2s",
};

export default UsersTable;
