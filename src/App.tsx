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

export default function App() {
  return (
    <BrowserRouter>
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
            {/* Dashboard */}

            <Route path="/" element={<Dashboard />} />

            {/* Practitioner */}

            <Route path="/find-doctor" element={<FindDoctor />} />

            {/* Consultation */}

            <Route path="/book" element={<BookConsultation />} />

            {/* Appointments */}

            <Route path="/appointments" element={<Appointments />} />

            {/* Prescriptions */}

            <Route path="/prescriptions" element={<Prescriptions />} />

            {/* Health Records */}

            <Route path="/records" element={<HealthRecords />} />

            <Route path="/payments" element={<Payments />} />

            {/* Profile */}

            <Route path="/profile" element={<Profile />} />

            {/* Help */}

            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
