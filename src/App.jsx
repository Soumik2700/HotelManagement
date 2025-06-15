import { HashRouter, Routes, Route } from "react-router-dom";
import GuestRoutes from "./routes/GuestRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes for Guests */}
        <Route path="/*" element={<GuestRoutes />} />

        {/* Protected Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
