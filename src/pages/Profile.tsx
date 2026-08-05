import {
  Camera,
  ChevronRight,
  Edit3,
  Heart,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  CalendarDays,
  Activity,
  LogOut,
} from "lucide-react";

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#F6F8F4] text-[#203B2A]">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="border-b border-[#28543A]/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#6D8A73]">
              Account
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-[#203B2A] sm:text-3xl">
              Profile & Settings
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-[#718277]">
              Manage your personal information, health preferences, and account
              settings.
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* =================================================
              PROFILE CARD
          ================================================= */}

          <section className="h-fit overflow-hidden rounded-3xl border border-[#28543A]/10 bg-white shadow-[0_10px_35px_rgba(40,84,58,0.06)]">
            {/* Cover */}

            <div className="relative h-28 bg-gradient-to-br from-[#28543A] via-[#3D6B4B] to-[#789878]">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="relative">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#DCE9D8] text-[#28543A] shadow-lg">
                    <UserRound size={42} strokeWidth={1.6} />
                  </div>

                  <button
                    type="button"
                    aria-label="Change profile photo"
                    className="
                      absolute
                      bottom-0
                      right-0
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      border-white
                      bg-[#28543A]
                      text-white
                      shadow-md
                      transition
                      hover:bg-[#1F4530]
                    "
                  >
                    <Camera size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* User */}

            <div className="px-6 pb-6 pt-16 text-center">
              <h2 className="text-lg font-bold text-[#203B2A]">
                Wellness User
              </h2>

              <p className="mt-1 text-xs text-[#78907E]">AyurCare Member</p>

              <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#F3F7F1] px-3 py-2.5 text-xs font-medium text-[#52705A]">
                <ShieldCheck size={15} />
                Verified Account
              </div>

              {/* Stats */}

              <div className="mt-6 grid grid-cols-2 divide-x divide-[#28543A]/10 border-y border-[#28543A]/10 py-4">
                <div>
                  <p className="text-lg font-bold text-[#28543A]">12</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-[#829187]">
                    Appointments
                  </p>
                </div>

                <div>
                  <p className="text-lg font-bold text-[#28543A]">4</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-[#829187]">
                    Records
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#28543A]/15
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-[#28543A]
                  transition
                  hover:bg-[#F3F7F1]
                "
              >
                <Edit3 size={14} />
                Edit Profile
              </button>
            </div>
          </section>

          {/* =================================================
              DETAILS
          ================================================= */}

          <div className="space-y-6">
            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <ProfileSection
              title="Personal Information"
              description="Your basic personal details"
              icon={<UserRound size={19} />}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <InfoField
                  label="Full Name"
                  value="Wellness User"
                  icon={<UserRound size={16} />}
                />

                <InfoField
                  label="Date of Birth"
                  value="12 June 1995"
                  icon={<CalendarDays size={16} />}
                />

                <InfoField
                  label="Email Address"
                  value="wellness@example.com"
                  icon={<Mail size={16} />}
                />

                <InfoField
                  label="Phone Number"
                  value="+91 98765 43210"
                  icon={<Phone size={16} />}
                />

                <InfoField
                  label="Location"
                  value="Bengaluru, India"
                  icon={<MapPin size={16} />}
                />

                <InfoField
                  label="Gender"
                  value="Prefer not to say"
                  icon={<UserRound size={16} />}
                />
              </div>
            </ProfileSection>

            {/* =================================================
                HEALTH PROFILE
            ================================================= */}

            <ProfileSection
              title="Health Profile"
              description="Information used to personalize your wellness journey"
              icon={<Heart size={19} />}
              action="View health profile"
            >
              <div className="grid gap-4 sm:grid-cols-3">
                <HealthCard
                  label="Prakriti"
                  value="Not completed"
                  icon={<Activity size={18} />}
                  muted
                />

                <HealthCard
                  label="Wellness Goal"
                  value="General Wellness"
                  icon={<Heart size={18} />}
                />

                <HealthCard
                  label="Activity Level"
                  value="Moderate"
                  icon={<Activity size={18} />}
                />
              </div>

              <div className="mt-5 rounded-2xl bg-[#F3F7F1] p-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#28543A] shadow-sm">
                    <ShieldCheck size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-[#28543A]">
                      Keep your health profile updated
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-[#718277]">
                      Completing your health profile helps practitioners provide
                      more personalized recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </ProfileSection>

            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <ProfileSection
              title="Contact Information"
              description="Manage your contact and address details"
              icon={<MapPin size={19} />}
            >
              <div className="rounded-2xl border border-[#28543A]/10 bg-[#FAFCF9] p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E5EFE2] text-[#28543A]">
                    <MapPin size={17} />
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-semibold text-[#28543A]">
                      Primary Address
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#718277]">
                      24 Wellness Avenue
                      <br />
                      Bengaluru, Karnataka 560001
                      <br />
                      India
                    </p>
                  </div>

                  <button
                    type="button"
                    className="text-xs font-semibold text-[#4F7D5A] hover:text-[#28543A]"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </ProfileSection>

            {/* =================================================
                ACCOUNT SETTINGS
            ================================================= */}

            <ProfileSection
              title="Account & Security"
              description="Manage your account security and preferences"
              icon={<Lock size={19} />}
            >
              <div className="divide-y divide-[#28543A]/10">
                <SettingsRow
                  icon={<Lock size={18} />}
                  title="Password & Security"
                  description="Update your password and security settings"
                />

                <SettingsRow
                  icon={<Mail size={18} />}
                  title="Email Preferences"
                  description="Choose which emails you receive from AyurCare"
                />

                <SettingsRow
                  icon={<ShieldCheck size={18} />}
                  title="Privacy & Data"
                  description="Manage your personal data and privacy"
                />
              </div>
            </ProfileSection>

            {/* =================================================
                LOGOUT
            ================================================= */}

            <div className="flex items-center justify-between rounded-2xl border border-red-100 bg-red-50/50 p-5">
              <div>
                <p className="text-sm font-semibold text-[#7A3636]">
                  Sign out of AyurCare
                </p>

                <p className="mt-1 text-xs text-[#9A6868]">
                  You can sign back in anytime.
                </p>
              </div>

              <button
                type="button"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-red-200
                  bg-white
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-red-600
                  transition
                  hover:bg-red-50
                "
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   PROFILE SECTION
========================================================= */

interface ProfileSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: string;
  children: React.ReactNode;
}

function ProfileSection({
  title,
  description,
  icon,
  action,
  children,
}: ProfileSectionProps) {
  return (
    <section className="rounded-3xl border border-[#28543A]/10 bg-white p-5 shadow-[0_8px_30px_rgba(40,84,58,0.045)] sm:p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E5EFE2] text-[#28543A]">
            {icon}
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#203B2A] sm:text-base">
              {title}
            </h2>

            <p className="mt-1 text-[11px] text-[#829187]">{description}</p>
          </div>
        </div>

        {action && (
          <button
            type="button"
            className="hidden items-center gap-1 text-xs font-semibold text-[#4F7D5A] transition hover:text-[#28543A] sm:flex"
          >
            {action}
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {children}
    </section>
  );
}

/* =========================================================
   INFO FIELD
========================================================= */

interface InfoFieldProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function InfoField({ label, value, icon }: InfoFieldProps) {
  return (
    <div className="rounded-2xl border border-[#28543A]/10 bg-[#FAFCF9] p-4">
      <div className="flex items-center gap-2 text-[#829187]">
        {icon}

        <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-sm font-semibold text-[#304D38]">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   HEALTH CARD
========================================================= */

interface HealthCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  muted?: boolean;
}

function HealthCard({ label, value, icon, muted = false }: HealthCardProps) {
  return (
    <div className="rounded-2xl border border-[#28543A]/10 bg-[#FAFCF9] p-4">
      <div className="flex items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E5EFE2] text-[#28543A]">
          {icon}
        </div>

        <ChevronRight size={15} className="text-[#A0ADA3]" />
      </div>

      <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#829187]">
        {label}
      </p>

      <p
        className={`mt-1 text-sm font-semibold ${
          muted ? "text-[#9AA69D]" : "text-[#304D38]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   SETTINGS ROW
========================================================= */

interface SettingsRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function SettingsRow({ icon, title, description }: SettingsRowProps) {
  return (
    <button
      type="button"
      className="
        group
        flex
        w-full
        items-center
        gap-4
        py-4
        text-left
        transition
      "
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F5EE] text-[#4F7D5A] transition group-hover:bg-[#E5EFE2]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-[#304D38]">{title}</p>

        <p className="mt-1 truncate text-[11px] text-[#829187]">
          {description}
        </p>
      </div>

      <ChevronRight
        size={16}
        className="shrink-0 text-[#A0ADA3] transition group-hover:translate-x-0.5 group-hover:text-[#4F7D5A]"
      />
    </button>
  );
}
