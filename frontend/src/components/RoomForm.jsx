import { useState } from "react";

export default function RoomForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    roomNo: "",
    capacity: "",
    hasAC: false,
    hasAttachedWashroom: false
  });
  const [errors, setErrors] = useState({});

  function validate(values) {
    const newErrors = {};
    if (!values.roomNo.trim()) newErrors.roomNo = "Room number is required";
    if (!values.capacity) newErrors.capacity = "Capacity is required";
    else if (Number(values.capacity) <= 0)
      newErrors.capacity = "Capacity must be greater than 0";
    return newErrors;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onSubmit({
      roomNo: form.roomNo.trim(),
      capacity: Number(form.capacity),
      hasAC: Boolean(form.hasAC),
      hasAttachedWashroom: Boolean(form.hasAttachedWashroom)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="label" htmlFor="roomNo">
          Room Number
        </label>
        <input
          id="roomNo"
          name="roomNo"
          className="input"
          value={form.roomNo}
          onChange={handleChange}
          placeholder="E.g. A101"
        />
        {errors.roomNo && (
          <p className="mt-1 text-xs text-red-600">{errors.roomNo}</p>
        )}
      </div>

      <div>
        <label className="label" htmlFor="capacity">
          Capacity
        </label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          min="1"
          className="input"
          value={form.capacity}
          onChange={handleChange}
        />
        {errors.capacity && (
          <p className="mt-1 text-xs text-red-600">{errors.capacity}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="hasAC"
            checked={form.hasAC}
            onChange={handleChange}
          />
          Has AC
        </label>

        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="hasAttachedWashroom"
            checked={form.hasAttachedWashroom}
            onChange={handleChange}
          />
          Attached Washroom
        </label>
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? "Saving..." : "Add Room"}
      </button>
    </form>
  );
}


