import { NavLink, Route, Routes } from "react-router-dom";
import AddRoomPage from "./pages/AddRoomPage.jsx";
import RoomListPage from "./pages/RoomListPage.jsx";
import SearchAllocatePage from "./pages/SearchAllocatePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Smart Hostel Room Allocation
            </h1>
            <p className="text-xs text-slate-500">
              Efficient, rules-based room allocation for hostels
            </p>
          </div>
          <nav className="flex gap-4 text-sm">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              Rooms
            </NavLink>
            <NavLink
              to="/rooms/add"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              Add Room
            </NavLink>
            <NavLink
              to="/allocate"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              Search &amp; Allocate
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-8 space-y-6">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/rooms" element={<RoomListPage />} />
          <Route path="/rooms/add" element={<AddRoomPage />} />
          <Route path="/allocate" element={<SearchAllocatePage />} />
        </Routes>
      </main>
    </div>
  );
}


