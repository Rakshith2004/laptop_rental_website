import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1, padding: "20px" }}>{children}</div>
    </div>
  );
};

export default AdminLayout;
