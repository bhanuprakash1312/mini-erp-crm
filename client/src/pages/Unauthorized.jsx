export default function Unauthorized() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        flexDirection: "column",
      }}
    >
      <h1>403</h1>
      <h2>Access Denied</h2>
      <p>You don't have permission to access this page.</p>
    </div>
  );
}