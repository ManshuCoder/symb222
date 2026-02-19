import { useEffect, useState } from "react";
import api from "../api/client.js";
import RoomTable from "../components/RoomTable.jsx";

export default function RoomListPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState(null);

  const loadRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleReset = async (id) => {
    setActionId(id);
    setError(null);
    try {
      await api.post(`/rooms/${id}/reset-occupancy`);
      await loadRooms();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    setActionId(id);
    setError(null);
    try {
      await api.delete(`/rooms/${id}`);
      await loadRooms();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionId(null);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">All Rooms</h2>
        <button
          className="text-sm rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          onClick={loadRooms}
        >
          Refresh
        </button>
      </div>

      <div className="space-y-3">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-sm text-slate-500">Loading rooms...</p>
        ) : (
          <RoomTable
            rooms={rooms}
            onResetOccupancy={handleReset}
            onDelete={handleDelete}
            loadingId={actionId}
          />
        )}
      </div>
    </section>
  );
}


