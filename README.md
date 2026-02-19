## Smart Hostel Room Allocation System

A production-ready MERN stack web application for managing hostel rooms and allocating students optimally based on capacity and facilities.

### Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS + React Router
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose

---

### Folder Structure

- **backend/**
  - `src/app.js` – Express app setup, middleware, routes
  - `src/server.js` – Server bootstrap and MongoDB connection
  - `src/config/db.js` – Mongoose connection helper
  - `src/models/Room.js` – Room Mongoose model
  - `src/controllers/roomController.js` – Room CRUD, search, allocation, dashboard
  - `src/routes/roomRoutes.js` – Room-related API routes
  - `src/middlewares/errorHandler.js` – Central error handlers
  - `src/middlewares/validateRequest.js` – Joi-based validation middleware
  - `src/seed/seedRooms.js` – Sample seed data script
- **frontend/**
  - `src/main.jsx` – React entry, Router
  - `src/App.jsx` – Layout + routes
  - `src/api/client.js` – Axios instance with base URL and error handling
  - `src/components/RoomForm.jsx` – Reusable room form
  - `src/components/RoomTable.jsx` – Rooms table with status and actions
  - `src/pages/DashboardPage.jsx` – Summary dashboard
  - `src/pages/AddRoomPage.jsx` – Add room UI
  - `src/pages/RoomListPage.jsx` – List/reset/delete rooms
  - `src/pages/SearchAllocatePage.jsx` – Search & allocate UI

---

### Backend Setup

1. **Install dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Create environment file**

   Create a `.env` file in `backend`:

   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/smart_hostel
   PORT=5000
   CLIENT_ORIGIN=http://localhost:5173
   ```

3. **Seed sample data (optional)**

   ```bash
   npm run seed
   ```

4. **Run backend**

   ```bash
   npm run dev
   ```

   API base URL (local): `http://localhost:5000/api`

---

### Frontend Setup

1. **Install dependencies**

   ```bash
   cd frontend
   npm install
   ```

2. **Environment file**

   Create `frontend/.env`:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. **Run frontend**

   ```bash
   npm run dev
   ```

   App will be available at `http://localhost:5173`.

---

### API Endpoints

Base URL: `/api`

- **Health**
  - `GET /api/health`
- **Rooms**
  - `POST /api/rooms` – Add room
  - `GET /api/rooms` – Get all rooms
  - `GET /api/rooms/search` – Search by filters
  - `POST /api/rooms/allocate` – Allocate room by rules
  - `POST /api/rooms/:id/reset-occupancy` – Reset occupancy to 0
  - `DELETE /api/rooms/:id` – Delete room
  - `GET /api/rooms/dashboard/summary` – Dashboard summary

All request bodies are validated via Joi and errors are returned with proper HTTP status codes.

---

### Room Data Model

`Room`:

- `roomNo` (String, unique, required)
- `capacity` (Number, required)
- `hasAC` (Boolean, required)
- `hasAttachedWashroom` (Boolean, required)
- `currentOccupancy` (Number, default 0)

---

### Allocation Algorithm

The `AllocateRoom(students, needsAC, needsWashroom)` API:

1. Validates that `students` is a positive integer and flags are booleans.
2. Filters rooms where:
   - `capacity - currentOccupancy >= students`
   - `hasAC === needsAC`
   - `hasAttachedWashroom === needsWashroom`
3. Sorts the filtered rooms by `capacity` ascending.
4. Picks the first room (smallest capacity that satisfies the requirement).
5. Updates `currentOccupancy += students` and persists the change.
6. If no room matches, returns HTTP `404` with `"No room available"`.

This ensures the allocation uses the tightest-fitting room that still satisfies constraints.

---

### UI Screens

- **Dashboard**
  - Shows total rooms, total capacity, total occupancy, and available beds.
- **Add Room Page**
  - Form with validation, success and error states.
- **Room Listing Page**
  - Table with occupancy, availability, reset occupancy, and delete room actions.
- **Search & Allocate Page**
  - Search filters: min capacity, AC required, attached washroom required.
  - Allocation panel with result output.

All screens use Tailwind for a clean, responsive UI with loading and error states.

---

### Sample Seed Data

The seed script (`npm run seed` in `backend`) creates rooms such as:

- `A101` – capacity 2, AC, attached washroom
- `A102` – capacity 3, AC, shared washroom
- `B201` – capacity 4, non-AC, attached washroom
- `B202` – capacity 1, non-AC, shared washroom

You can modify `src/seed/seedRooms.js` to adjust or add sample rooms.

---

### Deployment (Vercel / Render)

**Backend (Render example):**

1. Push code to GitHub.
2. Create a new Web Service in Render pointing to `backend/`.
3. Set build command: `npm install`.
4. Set start command: `npm start`.
5. Configure environment variables (`MONGO_URI`, `PORT`, `CLIENT_ORIGIN`).

**Frontend (Vercel example):**

1. Create a new Vercel project pointing to `frontend/`.
2. Set build command: `npm run build`, output directory: `dist`.
3. Configure environment variable `VITE_API_BASE_URL` with the Render backend URL (e.g. `https://your-backend.onrender.com/api`).
4. Deploy.

Ensure CORS `CLIENT_ORIGIN` on the backend matches your deployed frontend URL.


