import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}