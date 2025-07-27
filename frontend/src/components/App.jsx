import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import RequireAuth from "./RequireAuth";
import AdminDashboard from "./AdminDashboard";
import { Menu, X, Home, LogIn, UserPlus, LogOut, LayoutDashboard } from "lucide-react";
import authStore from "../stores/authStore";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const store = authStore();
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        {/* Sidebar */}
<div
  className={`w-64 text-black fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out shadow-2xl
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
  md:translate-x-0 md:static md:block flex flex-col justify-between bg-white`}
>
  {/* Header with Gradient */}
  <div>
    <div className="p-4 bg-gradient-to-r from-[#00b4db] to-[#0083b0] text-white text-xl font-bold rounded-br-2xl">
      Feedback System
    </div>

    {/* Sidebar Links */}
<ul className="space-y-2 mt-6 px-4">
  {user?.email !== "admin@gmail.com" && (
    <li>
      <Link
        to="/"
        className="flex items-center gap-2 bg-white text-black p-2 rounded-lg shadow hover:bg-gray-100 transition"
        onClick={() => setSidebarOpen(false)}
      >
        <Home size={18} /> Home
      </Link>
    </li>
  )}
  <li>
    <Link
      to="/login"
      className="flex items-center gap-2 bg-white text-black p-2 rounded-lg shadow hover:bg-gray-100 transition"
      onClick={() => setSidebarOpen(false)}
    >
      <LogIn size={18} /> Login
    </Link>
  </li>
  <li>
    <Link
      to="/signup"
      className="flex items-center gap-2 bg-white text-black p-2 rounded-lg shadow hover:bg-gray-100 transition"
      onClick={() => setSidebarOpen(false)}
    >
      <UserPlus size={18} /> SignUp
    </Link>
  </li>

  {user?.email === "admin@gmail.com" && (
    <li>
      <Link
        to="/admin-dashboard"
        className="flex items-center gap-2 bg-white text-black p-2 rounded-lg shadow hover:bg-gray-100 transition"
        onClick={() => setSidebarOpen(false)}
      >
        <LayoutDashboard size={18} /> Admin Dashboard
      </Link>
    </li>
  )}
</ul>
  </div>

  {/* Logout Button at Bottom */}
<Link
  to="/logout"
  className="flex items-center justify-center m-2 gap-2 text-white bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 p-2 rounded-lg shadow text-center"
  onClick={() => setSidebarOpen(false)}
>
  <LogOut size={18} /> Logout
</Link>
</div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Content area */}
        <div className="flex-1 md:-64 h-screen overflow-y-auto">
          {/* Mobile header */}
          <div className="flex items-center justify-between p-4 shadow-md bg-white md:hidden sticky top-0 z-80">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-700"
            >
              {sidebarOpen ? <X className="text-center" size={28} /> : <Menu size={28} />}
            </button>
            <h1 className="text-xl font-semibold">Feedback App</h1>
          </div>

          {/* Main content */}
          <main >
            <Routes>
              <Route index element={<RequireAuth><NotesPage /></RequireAuth>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route
                path="/admin-dashboard"
                element={
                  <RequireAuth>
                    <AdminDashboard />
                  </RequireAuth>
                }
              />

            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
