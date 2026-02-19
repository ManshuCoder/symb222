import { useState } from "react";
import api from "../api/client.js";
import RoomForm from "../components/RoomForm.jsx";

export default function AddRoomPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      await api.post("/rooms", data);
      setMessage("Room created successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Add Room</h2>
      <div className="card p-6 space-y-4">
        <RoomForm onSubmit={handleSubmit} loading={loading} />
        {message && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            {message}
          </div>
        )}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}


