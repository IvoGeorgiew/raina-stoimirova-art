import Sidebar from "./components/Sidebar";
import Artworks from "./pages/Artworks";

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Artworks />
    </div>
  );
}
