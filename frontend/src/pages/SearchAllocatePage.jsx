import { useState } from "react";
import api from "../api/client.js";

export default function SearchAllocatePage() {
  const [filters, setFilters] = useState({
    minCapacity: "",
    needsAC: "any",
    needsWashroom: "any"
  });
  const [searchResults, setSearchResults] = useState([]);
  const [allocationInput, setAllocationInput] = useState({
    students: "",
    needsAC: true,
    needsWashroom: true
  });
  const [allocationResult, setAllocationResult] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingAllocate, setLoadingAllocate] = useState(false);
  const [error, setError] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoadingSearch(true);
    setError(null);
    try {
      const params = {};
      if (filters.minCapacity) params.minCapacity = filters.minCapacity;
      if (filters.needsAC !== "any") params.needsAC = filters.needsAC;
      if (filters.needsWashroom !== "any")
        params.needsWashroom = filters.needsWashroom;

      const res = await api.get("/rooms/search", { params });
      setSearchResults(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleAllocationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAllocationInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleAllocate = async (e) => {
    e.preventDefault();
    const count = Number(allocationInput.students);
    if (!count || count <= 0) {
      setError("Students count must be greater than 0.");
      return;
    }
    setLoadingAllocate(true);
    setError(null);
    setAllocationResult(null);
    try {
      const payload = {
        students: count,
        needsAC: Boolean(allocationInput.needsAC),
        needsWashroom: Boolean(allocationInput.needsWashroom)
      };
      const res = await api.post("/rooms/allocate", payload);
      setAllocationResult(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAllocate(false);
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Search &amp; Allocate
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-800">
            Search Rooms
          </h3>
          <form onSubmit={handleSearch} className="space-y-3">
            <div>
              <label className="label" htmlFor="minCapacity">
                Minimum Capacity
              </label>
              <input
                id="minCapacity"
                name="minCapacity"
                type="number"
                min="1"
                className="input"
                value={filters.minCapacity}
                onChange={handleFilterChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label" htmlFor="needsAC">
                  AC Required
                </label>
                <select
                  id="needsAC"
                  name="needsAC"
                  className="input"
                  value={filters.needsAC}
                  onChange={handleFilterChange}
                >
                  <option value="any">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label className="label" htmlFor="needsWashroom">
                  Attached Washroom
                </label>
                <select
                  id="needsWashroom"
                  name="needsWashroom"
                  className="input"
                  value={filters.needsWashroom}
                  onChange={handleFilterChange}
                >
                  <option value="any">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loadingSearch}>
              {loadingSearch ? "Searching..." : "Search Rooms"}
            </button>
          </form>

          <div className="pt-4 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Search Results
            </h4>
            {loadingSearch ? (
              <p className="text-sm text-slate-500">Searching rooms...</p>
            ) : searchResults.length ? (
              <ul className="space-y-1 text-sm">
                {searchResults.map((room) => (
                  <li
                    key={room._id}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"
                  >
                    <span className="font-medium">{room.roomNo}</span>
                    <span className="text-xs text-slate-600">
                      {room.capacity} capacity, {room.currentOccupancy} occupied
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">
                No matching rooms yet. Adjust filters and search.
              </p>
            )}
          </div>
        </div>

        <div className="card p-6 space-y-4">
          <h3 className="text-sm font-semibold text-slate-800">
            Allocate Room
          </h3>
          <form onSubmit={handleAllocate} className="space-y-3">
            <div>
              <label className="label" htmlFor="students">
                Number of Students
              </label>
              <input
                id="students"
                name="students"
                type="number"
                min="1"
                className="input"
                value={allocationInput.students}
                onChange={handleAllocationChange}
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="needsAC"
                  checked={allocationInput.needsAC}
                  onChange={handleAllocationChange}
                />
                AC Required
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="needsWashroom"
                  checked={allocationInput.needsWashroom}
                  onChange={handleAllocationChange}
                />
                Attached Washroom Required
              </label>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loadingAllocate}
            >
              {loadingAllocate ? "Allocating..." : "Allocate Room"}
            </button>
          </form>

          <div className="pt-4 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Allocation Result
            </h4>
            {allocationResult ? (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                <p className="font-medium">{allocationResult.message}</p>
                {allocationResult.room && (
                  <p className="mt-1 text-xs">
                    Room {allocationResult.room.roomNo} allocated for{" "}
                    {allocationResult.allocatedStudents} students. New
                    occupancy: {allocationResult.room.currentOccupancy} /{" "}
                    {allocationResult.room.capacity}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                Run an allocation to see the result here.
              </p>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
    </section>
  );
}


