import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Prescriptions from "./pages/Prescriptions";
import FindDoctor from "./pages/FindDoctor";
import BookConsultation from "./pages/BookConsultation";
import Appointments from "./pages/Appointments";
import HealthRecords from "./pages/HealthRecords";
import Help from "./pages/Help";
import Payments from "./pages/Payments";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* App */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-[#F5F8F1]">
              <Sidebar />

              <main
                className="
                  min-h-screen
                  px-4
                  pb-8
                  pt-20
                  sm:px-6
                  sm:pt-20
                  md:px-8
                  lg:ml-[72px]
                  lg:px-8
                  lg:pt-8
                  xl:px-10
                "
              >
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/find-doctor" element={<FindDoctor />} />
                  <Route path="/book" element={<BookConsultation />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/prescriptions" element={<Prescriptions />} />
                  <Route path="/records" element={<HealthRecords />} />
                  <Route path="/payments" element={<Payments />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/help" element={<Help />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
