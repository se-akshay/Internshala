import { useState, useEffect } from "react";

const UserForm = ({ onSubmit, initialValues = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    companyName: "",
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || "",
        username: initialValues.username || "",
        email: initialValues.email || "",
        phone: initialValues.phone || "",
        website: initialValues.website || "",
        companyName: initialValues.company?.name || "",
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      ...formData,
      company: { name: formData.companyName },
    };
    delete userData.companyName;

    if (isEditing && initialValues) {
      userData.id = initialValues.id;
    }

    onSubmit(userData);

    if (!isEditing) {
      setFormData({
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
        companyName: "",
      });
    }
  };

  const fields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "username", label: "Username", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "text", required: true },
    { name: "website", label: "Website", type: "text", required: false },
    {
      name: "companyName",
      label: "Company Name",
      type: "text",
      required: false,
    },
  ];

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={{ marginTop: 0, color: "#2c3e50" }}>
        {isEditing ? "Edit User" : "Add New User"}
      </h3>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}
      >
        {fields.map((field) => (
          <div
            key={field.name}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label style={labelStyle}>
              {field.label} {field.required && "*"}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              style={inputStyle}
            />
          </div>
        ))}
      </div>

      <button type="submit" style={buttonStyle}>
        {isEditing ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

const formStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  marginBottom: "30px",
};

const labelStyle = {
  marginBottom: "5px",
  color: "#555",
  fontSize: "14px",
  fontWeight: "500",
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "14px",
};

const buttonStyle = {
  backgroundColor: "#3498db",
  color: "white",
  padding: "12px 30px",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "15px",
  fontWeight: "bold",
};

export default UserForm;
