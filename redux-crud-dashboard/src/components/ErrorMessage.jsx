const ErrorMessage = ({ message }) => {
  return (
    <div
      style={{
        backgroundColor: "#fee",
        color: "#c33",
        padding: "15px",
        borderRadius: "5px",
        border: "1px solid #fcc",
        margin: "20px 0",
        textAlign: "center",
      }}
    >
      <strong>Error:</strong> {message}
    </div>
  );
};

export default ErrorMessage;
