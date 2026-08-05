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

interface PageProps {
  title: string;
  description: string;
}

function Page({ title, description }: PageProps) {
  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-6">
      {/* Page Header */}

      <div>
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.15em]
            text-[#6F9878]
          "
        >
          AyurCare
        </p>

        <h1
          className="
            mt-1
            text-2xl
            font-bold
            tracking-tight
            text-[#24352A]
            sm:text-3xl
          "
        >
          {title}
        </h1>

        <p className="mt-2 text-sm text-[#6B7C70]">{description}</p>
      </div>

      {/* Placeholder Content */}

      <div
        className="
          rounded-[24px]
          border
          border-[#4F7D5A]/10
          bg-white/70
          p-6
          shadow-[0_12px_40px_rgba(40,84,58,0.08)]
          backdrop-blur-xl
          sm:p-8
        "
      >
        <div
          className="
            flex
            min-h-[220px]
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-[#4F7D5A]/15
            bg-[#F5F8F1]/70
          "
        >
          <p className="text-sm text-[#6B7C70]">Page content goes here.</p>
        </div>
      </div>
    </div>
  );
}

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
