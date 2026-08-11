import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
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
  X,
  Save,
} from "lucide-react";

type ProfileData = {
  id: string;
  full_name: string | null;
  phone: string | null;
  date_of_birth: string | null;
  gender: string | null;
  location: string | null;
};

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* =========================================================
     LOAD PROFILE
  ========================================================= */

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError("");

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Auth error:", authError);
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (!user) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      setEmail(user.email || "");

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Profile error:", profileError);
        setError(profileError.message);
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  const handleSaveProfile = async () => {
    if (!profile) return;

    setSaving(true);
    setMessage("");
    setError("");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setError("You are not logged in.");
      setSaving(false);
      return;
    }

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        date_of_birth: profile.date_of_birth || null,
        gender: profile.gender,
        location: profile.location,
      })
      .eq("id", user.id)
      .select()
      .single();

    if (updateError) {
      console.error("Profile update error:", updateError);
      setError(updateError.message);
      setSaving(false);
      return;
    }

    setProfile(data);
    setMessage("Profile updated successfully.");
    setEditing(false);
    setSaving(false);
  };

  /* =========================================================
     SIGN OUT
  ========================================================= */

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error);
      setError(error.message);
      return;
    }

    window.location.href = "/";
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F8F4] text-[#203B2A]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#DCE9D8] border-t-[#4F7D5A]" />

          <p className="mt-4 text-sm font-semibold text-[#4F7D5A]">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error && !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F8F4] px-4">
        <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-7 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
            !
          </div>

          <h2 className="mt-4 text-lg font-bold text-[#203B2A]">
            Unable to load profile
          </h2>

          <p className="mt-2 text-sm text-[#718277]">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-[#28543A] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#214731]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8F4] text-[#203B2A]">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="border-b border-[#28543A]/10 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6D8A73] sm:text-xs">
            Account
          </p>

          <h1 className="text-xl font-bold tracking-tight text-[#203B2A] sm:text-2xl lg:text-3xl">
            Profile & Settings
          </h1>

          <p className="mt-1.5 max-w-2xl text-xs leading-5 text-[#718277] sm:mt-2 sm:text-sm">
            Manage your personal information, health preferences, and account
            settings.
          </p>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        <div className="grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)] lg:gap-6">
          {/* =================================================
              PROFILE CARD
          ================================================= */}

          <section className="h-fit overflow-hidden rounded-2xl border border-[#28543A]/10 bg-white shadow-[0_10px_35px_rgba(40,84,58,0.06)] sm:rounded-3xl">
            {/* Cover */}

            <div className="relative h-24 bg-gradient-to-br from-[#28543A] via-[#3D6B4B] to-[#789878] sm:h-28">
              <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 sm:-bottom-12">
                <div className="relative">
                  <div className="flex h-[86px] w-[86px] items-center justify-center rounded-full border-4 border-white bg-[#DCE9D8] text-[#28543A] shadow-lg sm:h-24 sm:w-24">
                    <UserRound
                      size={36}
                      strokeWidth={1.6}
                      className="sm:h-[42px] sm:w-[42px]"
                    />
                  </div>

                  <button
                    type="button"
                    aria-label="Change profile photo"
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#28543A] text-white shadow-md transition hover:bg-[#1F4530] active:scale-95"
                  >
                    <Camera size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* User */}

            <div className="px-4 pb-5 pt-14 text-center sm:px-6 sm:pb-6 sm:pt-16">
              <h2 className="text-base font-bold text-[#203B2A] sm:text-lg">
                {profile?.full_name || "Add your name"}
              </h2>

              <p className="mt-1 text-[11px] text-[#78907E] sm:text-xs">
                AyurCare Member
              </p>

              {/* Verified */}

              <div className="mx-auto mt-4 flex w-fit items-center justify-center gap-2 rounded-xl bg-[#F3F7F1] px-3 py-2 text-[10px] font-medium text-[#52705A] sm:mt-5 sm:text-xs">
                <ShieldCheck size={14} />
                Verified Account
              </div>

              {/* Stats */}

              <div className="mt-5 grid grid-cols-2 divide-x divide-[#28543A]/10 border-y border-[#28543A]/10 py-3.5 sm:mt-6 sm:py-4">
                <div>
                  <p className="text-lg font-bold text-[#28543A]">12</p>

                  <p className="mt-1 text-[9px] uppercase tracking-wider text-[#829187] sm:text-[10px]">
                    Appointments
                  </p>
                </div>

                <div>
                  <p className="text-lg font-bold text-[#28543A]">4</p>

                  <p className="mt-1 text-[9px] uppercase tracking-wider text-[#829187] sm:text-[10px]">
                    Records
                  </p>
                </div>
              </div>

              {/* Edit Profile */}

              {!editing ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(true);
                    setMessage("");
                    setError("");
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#28543A]/15 bg-white px-4 py-2.5 text-xs font-semibold text-[#28543A] transition hover:bg-[#F3F7F1] active:scale-[0.99] sm:mt-5 active:scale-[0.99] sm:mt-5"
                >
                  <Edit3 size={14} />
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setMessage("");
                    setError("");
                  }}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#28543A]/15 bg-white px-4 py-2.5 text-xs font-semibold text-[#6B7C70] transition hover:bg-[#F3F7F1] active:scale-[0.99] sm:mt-5"
                >
                  <X size={14} />
                  Cancel Editing
                </button>
              )}
            </div>
          </section>

          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <div className="min-w-0 space-y-5 sm:space-y-6">
            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <ProfileSection
              title="Personal Information"
              description="Your basic personal details"
              icon={<UserRound size={18} />}
            >
              {editing ? (
                <>
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    {/* Full Name */}

                    <EditField
                      label="Full Name"
                      value={profile?.full_name || ""}
                      onChange={(value) =>
                        setProfile((current) =>
                          current
                            ? {
                                ...current,
                                full_name: value,
                              }
                            : current,
                        )
                      }
                    />

                    {/* Date of Birth */}

                    <EditField
                      label="Date of Birth"
                      type="date"
                      value={profile?.date_of_birth || ""}
                      onChange={(value) =>
                        setProfile((current) =>
                          current
                            ? {
                                ...current,
                                date_of_birth: value,
                              }
                            : current,
                        )
                      }
                    />

                    {/* Email */}

                    <div className="min-w-0 rounded-2xl border border-[#28543A]/10 bg-[#F3F7F1] p-3.5 sm:p-4">
                      <div className="flex items-center gap-2 text-[#829187]">
                        <Mail size={15} />

                        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] sm:text-[10px]">
                          Email Address
                        </span>
                      </div>

                      <p className="mt-2 truncate text-xs font-semibold text-[#304D38] sm:text-sm">
                        {email || "Not available"}
                      </p>

                      <p className="mt-1 text-[9px] text-[#829187]">
                        Email is managed by your login account.
                      </p>
                    </div>

                    {/* Phone */}

                    <EditField
                      label="Phone Number"
                      value={profile?.phone || ""}
                      onChange={(value) =>
                        setProfile((current) =>
                          current
                            ? {
                                ...current,
                                phone: value,
                              }
                            : current,
                        )
                      }
                    />

                    {/* Location */}

                    <EditField
                      label="Location"
                      value={profile?.location || ""}
                      onChange={(value) =>
                        setProfile((current) =>
                          current
                            ? {
                                ...current,
                                location: value,
                              }
                            : current,
                        )
                      }
                    />

                    {/* Gender */}

                    <div className="min-w-0 rounded-2xl border border-[#28543A]/10 bg-[#FAFCF9] p-3.5 sm:p-4">
                      <label className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#829187] sm:text-[10px]">
                        Gender
                      </label>

                      <select
                        value={profile?.gender || ""}
                        onChange={(e) =>
                          setProfile((current) =>
                            current
                              ? {
                                  ...current,
                                  gender: e.target.value,
                                }
                              : current,
                          )
                        }
                        className="mt-2 w-full rounded-xl border border-[#DCE5DC] bg-white px-3 py-2.5 text-sm text-[#304D38] outline-none transition focus:border-[#4F7D5A] focus:ring-2 focus:ring-[#4F7D5A]/10"
                      >
                        <option value="">Select gender</option>

                        <option value="Male">Male</option>

                        <option value="Female">Female</option>

                        <option value="Other">Other</option>

                        <option value="Prefer not to say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Save / Cancel */}

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-h-[20px]">
                      {message && (
                        <p className="text-xs font-medium text-[#4F7D5A]">
                          {message}
                        </p>
                      )}

                      {error && (
                        <p className="text-xs font-medium text-red-600">
                          {error}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col-reverse gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(false);
                          setMessage("");
                          setError("");
                        }}
                        disabled={saving}
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#DCE5DC] bg-white px-5 py-2.5 text-xs font-semibold text-[#617065] transition hover:bg-[#F5F8F4] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <X size={14} />
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#28543A] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#214731] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Save size={14} />

                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="sm:col-span-2">
                    <InfoField
                      label="Full Name"
                      value={profile?.full_name || "Not provided"}
                      icon={<UserRound size={15} />}
                    />
                  </div>

                  <InfoField
                    label="Date of Birth"
                    value={profile?.date_of_birth || "Not provided"}
                    icon={<CalendarDays size={15} />}
                  />

                  <InfoField
                    label="Email Address"
                    value={email || "Not available"}
                    icon={<Mail size={15} />}
                  />

                  <InfoField
                    label="Phone Number"
                    value={profile?.phone || "Not provided"}
                    icon={<Phone size={15} />}
                  />

                  <InfoField
                    label="Location"
                    value={profile?.location || "Not provided"}
                    icon={<MapPin size={15} />}
                  />

                  <InfoField
                    label="Gender"
                    value={profile?.gender || "Not provided"}
                    icon={<UserRound size={15} />}
                  />
                </div>
              )}
            </ProfileSection>

            {/* =================================================
                HEALTH PROFILE
            ================================================= */}

            <ProfileSection
              title="Health Profile"
              description="Information used to personalize your wellness journey"
              icon={<Heart size={18} />}
              action="View health profile"
            >
              <div className="grid gap-3 sm:grid-cols-3">
                <HealthCard
                  label="Prakriti"
                  value="Not completed"
                  icon={<Activity size={17} />}
                  muted
                />

                <HealthCard
                  label="Wellness Goal"
                  value="General Wellness"
                  icon={<Heart size={17} />}
                />

                <HealthCard
                  label="Activity Level"
                  value="Moderate"
                  icon={<Activity size={17} />}
                />
              </div>

              <div className="mt-4 rounded-2xl bg-[#F3F7F1] p-3.5 sm:mt-5 sm:p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#28543A] shadow-sm">
                    <ShieldCheck size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#28543A]">
                      Keep your health profile updated
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-[#718277] sm:text-[11px]">
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
              icon={<MapPin size={18} />}
            >
              <div className="rounded-2xl border border-[#28543A]/10 bg-[#FAFCF9] p-3.5 sm:p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E5EFE2] text-[#28543A]">
                    <MapPin size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-[#28543A]">
                      Primary Address
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-[#718277] sm:text-xs">
                      {profile?.location || "No address provided"}
                    </p>
                  </div>
                  {!editing && (
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="shrink-0 text-[10px] font-semibold text-[#4F7D5A] transition hover:text-[#28543A] sm:text-xs"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </ProfileSection>

            {/* =================================================
                ACCOUNT SETTINGS
            ================================================= */}

            <ProfileSection
              title="Account & Security"
              description="Manage your account security and preferences"
              icon={<Lock size={18} />}
            >
              <div className="divide-y divide-[#28543A]/10">
                <SettingsRow
                  icon={<Lock size={17} />}
                  title="Password & Security"
                  description="Update your password and security settings"
                />

                <SettingsRow
                  icon={<Mail size={17} />}
                  title="Email Preferences"
                  description="Choose which emails you receive from AyurCare"
                />

                <SettingsRow
                  icon={<ShieldCheck size={17} />}
                  title="Privacy & Data"
                  description="Manage your personal data and privacy"
                />
              </div>
            </ProfileSection>

            {/* =================================================
                LOGOUT
            ================================================= */}

            <div className="flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50/50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#7A3636]">
                  Sign out of AyurCare
                </p>

                <p className="mt-1 text-[10px] leading-4 text-[#9A6868] sm:text-xs">
                  You can sign back in anytime.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 active:scale-[0.99] sm:w-auto"
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
    <section className="rounded-2xl border border-[#28543A]/10 bg-white p-4 shadow-[0_8px_30px_rgba(40,84,58,0.045)] sm:rounded-3xl sm:p-5 lg:p-6">
      <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E5EFE2] text-[#28543A] sm:h-10 sm:w-10">
            {icon}
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-bold text-[#203B2A] sm:text-base">
              {title}
            </h2>

            <p className="mt-1 text-[10px] leading-4 text-[#829187] sm:text-[11px]">
              {description}
            </p>
          </div>
        </div>

        {action && (
          <button
            type="button"
            className="hidden shrink-0 items-center gap-1 text-xs font-semibold text-[#4F7D5A] transition hover:text-[#28543A] sm:flex"
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
    <div className="min-w-0 rounded-2xl border border-[#28543A]/10 bg-[#FAFCF9] p-3.5 sm:p-4">
      <div className="flex items-center gap-2 text-[#829187]">
        {icon}

        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] sm:text-[10px]">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-xs font-semibold text-[#304D38] sm:text-sm">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   EDIT FIELD
========================================================= */

interface EditFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

function EditField({ label, value, onChange, type = "text" }: EditFieldProps) {
  return (
    <div className="min-w-0 rounded-2xl border border-[#28543A]/10 bg-[#FAFCF9] p-3.5 sm:p-4">
      <label className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#829187] sm:text-[10px]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-[#DCE5DC] bg-white px-3 py-2.5 text-sm text-[#304D38] outline-none transition focus:border-[#4F7D5A] focus:ring-2 focus:ring-[#4F7D5A]/10"
      />
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
    <div className="rounded-2xl border border-[#28543A]/10 bg-[#FAFCF9] p-3.5 sm:p-4">
      <div className="flex items-center justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E5EFE2] text-[#28543A]">
          {icon}
        </div>

        <ChevronRight size={15} className="text-[#A0ADA3]" />
      </div>

      <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#829187] sm:mt-4 sm:text-[10px]">
        {label}
      </p>

      <p
        className={`mt-1 text-xs font-semibold sm:text-sm ${
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
      className="group flex w-full min-w-0 items-center gap-3 py-3.5 text-left transition sm:gap-4 sm:py-4"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0F5EE] text-[#4F7D5A] transition group-hover:bg-[#E5EFE2]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold text-[#304D38]">{title}</p>

        <p className="mt-1 truncate text-[10px] text-[#829187] sm:text-[11px]">
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
