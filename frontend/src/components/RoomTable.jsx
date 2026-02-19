export default function RoomTable({
  rooms,
  onResetOccupancy,
  onDelete,
  loadingId
}) {
  if (!rooms.length) {
    return (
      <p className="text-sm text-slate-500">
        No rooms found. Try adding a new room.
      </p>
    );
  }

  return (
    <div className="overflow-auto rounded-xl border border-slate-200 shadow-sm bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-2 text-left font-semibold text-slate-700">
              Room
            </th>
            <th className="px-4 py-2 text-left font-semibold text-slate-700">
              Capacity
            </th>
            <th className="px-4 py-2 text-left font-semibold text-slate-700">
              AC
            </th>
            <th className="px-4 py-2 text-left font-semibold text-slate-700">
              Washroom
            </th>
            <th className="px-4 py-2 text-left font-semibold text-slate-700">
              Occupancy
            </th>
            <th className="px-4 py-2 text-left font-semibold text-slate-700">
              Status
            </th>
            <th className="px-4 py-2 text-right font-semibold text-slate-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => {
            const available = room.capacity - room.currentOccupancy;
            const isFull = available <= 0;
            return (
              <tr key={room._id} className="border-t border-slate-100">
                <td className="px-4 py-2">{room.roomNo}</td>
                <td className="px-4 py-2">{room.capacity}</td>
                <td className="px-4 py-2">
                  {room.hasAC ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      AC
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      Non-AC
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {room.hasAttachedWashroom ? (
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      Attached
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      Shared
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {room.currentOccupancy} / {room.capacity}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      isFull
                        ? "bg-red-50 text-red-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {isFull ? "Full" : "Available"}
                  </span>
                </td>
                <td className="px-4 py-2 text-right space-x-2">
                  <button
                    className="text-xs rounded-lg border border-slate-200 px-2 py-1 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    onClick={() => onResetOccupancy(room._id)}
                    disabled={loadingId === room._id}
                  >
                    Reset
                  </button>
                  <button
                    className="text-xs rounded-lg border border-red-200 px-2 py-1 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    onClick={() => onDelete(room._id)}
                    disabled={loadingId === room._id}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


