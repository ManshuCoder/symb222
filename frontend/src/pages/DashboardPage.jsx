import { useEffect, useState } from "react";
import api from "../api/client.js";

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/rooms/dashboard/summary");
      setSummary(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Hostel Overview
          </h2>
          <p className="text-sm text-slate-500">
            Quick snapshot of capacity, occupancy, and available beds.
          </p>
        </div>
        <button
          className="text-sm rounded-lg border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
          onClick={loadSummary}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <div className="card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Total Rooms
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {loading || !summary ? "—" : summary.totalRooms}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Total Capacity
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {loading || !summary ? "—" : summary.totalCapacity}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Occupied Beds
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {loading || !summary ? "—" : summary.totalOccupancy}
          </p>
        </div>
        <div className="card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Available Beds
          </p>
          <p className="mt-2 text-2xl font-semibold text-emerald-700">
            {loading || !summary ? "—" : summary.availableBeds}
          </p>
        </div>
      </div>
    </section>
  );
}


