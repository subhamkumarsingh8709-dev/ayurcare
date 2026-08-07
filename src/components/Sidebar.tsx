import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Activity,
  CalendarCheck,
  ChevronRight,
  CircleHelp,
  CreditCard,
  FolderHeart,
  LayoutDashboard,
  Menu,
  Pill,
  Search,
  Settings,
  UserRound,
  X,
} from "lucide-react";

export const SIDEBAR_WIDTH = 264;
export const SIDEBAR_COLLAPSED_WIDTH = 72;

interface NavigationItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

interface NavigationSection {
  label: string;
  items: NavigationItem[];
}

const sections: NavigationSection[] = [
  {
    label: "Wellness",
    items: [
      {
        to: "/dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard size={15} />,
      },
      {
        to: "/find-doctor",
        label: "Find Practitioner",
        icon: <Search size={15} />,
      },
      {
        to: "/book",
        label: "Book Consultation",
        icon: <CalendarCheck size={15} />,
      },
      {
        to: "/appointments",
        label: "My Appointments",
        icon: <Activity size={15} />,
      },
    ],
  },

  {
    label: "My Health",
    items: [
      {
        to: "/records",
        label: "Health Records",
        icon: <FolderHeart size={15} />,
      },
      {
        to: "/prescriptions",
        label: "Prescriptions",
        icon: <Pill size={15} />,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        to: "/payments",
        label: "Payments & Billing",
        icon: <CreditCard size={15} />,
      },
      {
        to: "/help",
        label: "Help & Support",
        icon: <CircleHelp size={15} />,
      },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();

  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
  };

  const isExpanded = expanded || mobileOpen;

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        className="
          fixed
          left-4
          top-4
          z-[60]
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-[#4F7D5A]/20
          bg-white
          text-[#28543A]
          shadow-[0_8px_25px_rgba(40,84,58,0.15)]
          transition-all
          duration-200
          hover:bg-[#F3F8F2]
          lg:hidden
        "
      >
        <Menu size={21} />
      </button>
      <div
        onClick={closeMobile}
        className={`
          fixed
          inset-0
          z-40
          bg-[#183322]/40
          backdrop-blur-[2px]
          transition-opacity
          duration-300
          lg:hidden

          ${
            mobileOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =====================================================
          SINGLE SIDEBAR
      ===================================================== */}

      <aside
        onMouseEnter={() => {
          if (window.innerWidth >= 1024) {
            setExpanded(true);
          }
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 1024) {
            setExpanded(false);
          }
        }}
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          flex-col
          overflow-hidden
          bg-[#28543A]
          text-white
          shadow-[10px_0_40px_rgba(31,69,48,0.16)]
          transition-[width,transform]
          duration-300
          ease-in-out

          ${
            mobileOpen
              ? "w-[min(88vw,300px)] translate-x-0"
              : "-translate-x-full w-[min(88vw,300px)]"
          }

          lg:translate-x-0

          ${expanded ? "lg:w-[264px]" : "lg:w-[72px]"}
        `}
      >
        <div
          className={`
            flex
            min-h-[78px]
            shrink-0
            items-center
            border-b
            border-white/10
            transition-all
            duration-300

            ${isExpanded ? "justify-between px-4" : "justify-center px-2"}
          `}
        >
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-white/10
                text-[#DCE9D8]
                shadow-[inset_2px_2px_7px_rgba(255,255,255,0.06)]
              "
              >
                <LeafLogo />
              </div>

              <div
                className={`
                overflow-hidden
                whitespace-nowrap
                transition-all
                duration-300

                ${isExpanded ? "w-[150px] opacity-100" : "w-0 opacity-0"}
              `}
              >
                <p className="text-[18px] font-bold tracking-tight">AyurCare</p>

                <p className="mt-0.5 text-[10px] text-[#DCE9D8]/55">
                  Balanced wellness
                </p>
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close navigation"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              text-white/60
              transition
              hover:bg-white/10
              hover:text-white
              lg:hidden
            "
          >
            <X size={19} />
          </button>
        </div>

        <Navigation
          expanded={isExpanded}
          activePath={location.pathname}
          onNavigate={closeMobile}
        />
        <div
          className="
            shrink-0
            border-t
            border-white/10
            bg-[#234C35]
            px-2
            py-3
          "
        >
          <UserProfile expanded={isExpanded} />
        </div>
      </aside>
    </>
  );
}

function LeafLogo() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5 3.5C12.2 3.8 6.5 7.1 5.1 12.1C4.2 15.4 6.1 18.1 9.1 18.4C13.4 18.8 18.3 14.8 20.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M4 21C7.2 15.8 11.2 12.5 16.8 9.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
interface NavigationProps {
  expanded: boolean;
  activePath: string;
  onNavigate?: () => void;
}

function Navigation({ expanded, activePath, onNavigate }: NavigationProps) {
  return (
    <nav
      className="
        flex-1
        overflow-y-auto
        overflow-x-hidden
        px-2
        py-5
      "
    >
      {sections.map((section) => (
        <div key={section.label} className="mb-6 last:mb-0">
          <div
            className={`
              overflow-hidden
              whitespace-nowrap
              px-3
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#C8DEC9]/40
              transition-all
              duration-300

              ${expanded ? "h-5 opacity-100" : "h-0 pb-0 opacity-0"}
            `}
          >
            {section.label}
          </div>

          {/* Items */}

          <div className="space-y-1">
            {section.items.map((item) => {
              const active = isPathActive(activePath, item.to);

              return (
                <NavItem
                  key={item.to}
                  item={item}
                  active={active}
                  expanded={expanded}
                  onNavigate={onNavigate}
                />
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

interface NavItemProps {
  item: NavigationItem;
  active: boolean;
  expanded: boolean;
  onNavigate?: () => void;
}

function NavItem({ item, active, expanded, onNavigate }: NavItemProps) {
  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      title={!expanded ? item.label : undefined}
      className={`
        group
        relative
        flex
        h-8
        items-center
        rounded-xl
        transition-all
        duration-200

        ${expanded ? "mx-0 gap-1 px-3" : "justify-center px-0"}

        ${
          active
            ? `
              bg-white/[0.13]
              text-white
              shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]
            `
            : `
              text-white/65
              hover:bg-white/[0.07]
              hover:text-white
            `
        }
      `}
    >
      {/* Active indicator */}

      {active && (
        <span
          className="
            absolute
            left-0
            top-1/2
            h-6
            w-[3px]
            -translate-y-1/2
            rounded-r-full
            bg-[#C8DEC9]
            shadow-[0_0_10px_rgba(200,222,201,0.35)]
          "
        />
      )}

      <span
        className={`
          flex
          h-5
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          transition-all
          duration-200
          ${
            active
              ? "text-[#DCE9D8]"
              : "text-white/55 group-hover:text-[#DCE9D8]"
          }
        `}
      >
        {item.icon}
      </span>

      <span
        className={`
          overflow-hidden
          whitespace-nowrap
          text-[10px]
          transition-all
          duration-300

          ${expanded ? "w-[170px] opacity-100" : "w-0 opacity-0"}

          ${active ? "font-semibold" : "font-medium"}
        `}
      >
        {item.label}
      </span>

      {expanded && (
        <ChevronRight
          size={14}
          className="
            ml-auto
            shrink-0
            text-white/0
            transition-all
            duration-200
            group-hover:translate-x-0.5
            group-hover:text-white/35
          "
        />
      )}

      {/* Collapsed tooltip */}

      {!expanded && (
        <span
          className="
            pointer-events-none
            absolute
            left-[calc(100%+12px)]
            z-[100]
            whitespace-nowrap
            rounded-lg
            bg-[#183322]
            px-3
            py-2
            text-[11px]
            font-medium
            text-white
            opacity-0
            shadow-xl
            transition-all
            duration-150
            group-hover:translate-x-0.5
            group-hover:opacity-100
          "
        >
          {item.label}
        </span>
      )}
    </NavLink>
  );
}

/* =========================================================
   USER PROFILE
========================================================= */

function UserProfile({ expanded }: { expanded: boolean }) {
  return (
    <div
      className={`
        flex
        items-center
        rounded-2xl
        bg-white/[0.06]
        p-2
        transition-all
        duration-300

        ${expanded ? "gap-3" : "justify-center"}
      `}
    >
      {/* Avatar */}

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#DCE9D8]
          text-[#28543A]
          shadow-[0_4px_12px_rgba(0,0,0,0.12)]
        "
      >
        <UserRound size={18} strokeWidth={1.8} />
      </div>

      {/* Details */}

      <div
        className={`
          min-w-0
          overflow-hidden
          whitespace-nowrap
          transition-all
          duration-300

          ${expanded ? "w-[125px] opacity-100" : "w-0 opacity-0"}
        `}
      >
        <p className="truncate text-xs font-semibold text-white">
          Wellness User
        </p>

        <p className="mt-0.5 truncate text-[10px] text-white/45">
          AyurCare Member
        </p>
      </div>

      {/* Settings */}

      {expanded && (
        <NavLink
          to="/profile"
          className="
            ml-auto
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-white/45
            transition-all
            duration-200
            hover:bg-white/10
            hover:text-white
          "
          title="Profile settings"
        >
          <Settings size={16} />
        </NavLink>
      )}
    </div>
  );
}

/* =========================================================
   ACTIVE ROUTE
========================================================= */

function isPathActive(pathname: string, path: string) {
  if (path === "/") {
    return pathname === "/";
  }

  return pathname === path || pathname.startsWith(`${path}/`);
}
