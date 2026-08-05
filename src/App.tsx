import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";

function FindDoctor() {
  return (
    <Page
      title="Find a Practitioner"
      description="Find the right practitioner for your wellness journey."
    />
  );
}

function BookConsultation() {
  return (
    <Page
      title="Book a Consultation"
      description="Schedule your next consultation."
    />
  );
}

function Appointments() {
  return (
    <Page
      title="My Appointments"
      description="View and manage your appointments."
    />
  );
}

function Prescriptions() {
  return (
    <Page
      title="Prescriptions"
      description="View your prescriptions and medicines."
    />
  );
}

function HealthRecords() {
  return (
    <Page
      title="Health Records & Prakriti"
      description="Manage your health records and Prakriti information."
    />
  );
}

function Messages() {
  return (
    <Page title="Messages" description="Connect with your practitioners." />
  );
}

function Notifications() {
  return (
    <Page title="Notifications" description="View your latest notifications." />
  );
}

function Reviews() {
  return (
    <Page
      title="Reviews & Ratings"
      description="Manage your reviews and ratings."
    />
  );
}

function Payments() {
  return (
    <Page
      title="Payments & Billing"
      description="Manage your payments and billing."
    />
  );
}

function Profile() {
  return (
    <Page
      title="Profile & Settings"
      description="Manage your profile and application settings."
    />
  );
}

function Help() {
  return <Page title="Help & Support" description="Get help with AyurCare." />;
}

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

            {/* Messages */}

            <Route path="/messages" element={<Messages />} />

            {/* Notifications */}

            <Route path="/notifications" element={<Notifications />} />

            {/* Reviews */}

            <Route path="/reviews" element={<Reviews />} />

            {/* Payments */}

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
