import {
  Award,
  CalendarCheck,
  Clock3,
  Heart,
  MapPin,
  Star,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";


export type Doctor = {
  number: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  fee: number;
  location: string;
  languages: string[] | string;
  image: string;
  available: string;
  online: boolean;
  verified: boolean;
  phone_number?: string;
  Uid: string;
};

/* =========================================================
   PRACTITIONER CARD
========================================================= */

export function PractitionerCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="group overflow-hidden rounded-[24px] border border-[#E1E8E1] bg-white shadow-[0_8px_35px_rgba(40,84,58,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(40,84,58,0.11)]">
      {/* Image */}

      <div className="relative h-52 overflow-hidden bg-[#E9EFE9]">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="
            h-full
            w-full
            object-cover
            object-top
            transition
            duration-500
            group-hover:scale-105
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {/* Verified */}

        {doctor.verified && (
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-[#28543A] shadow-lg backdrop-blur">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#DDEBDD]">
              ✓
            </span>
            Verified
          </div>
        )}

        {/* Favorite */}

        <button
          type="button"
          aria-label={`Save ${doctor.name}`}
          className="
            absolute
            right-4
            top-4
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-[#52645A]
            shadow-lg
            backdrop-blur
            transition
            hover:bg-white
            hover:text-[#B15D68]
          "
        >
          <Heart size={16} />
        </button>

        {/* Online */}

        {doctor.online && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-[#28543A]/90 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A9D7A9]" />
            Available online
          </div>
        )}
      </div>

      {/* Content */}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[17px] font-bold text-[#28392D]">
              {doctor.name}
            </h3>

            <p className="mt-1 text-xs font-medium text-[#64806C]">
              {doctor.specialty}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1 rounded-lg bg-[#FFF8E7] px-2 py-1.5">
            <Star size={13} className="fill-[#D6A943] text-[#D6A943]" />

            <span className="text-xs font-bold text-[#765D22]">
              {doctor.rating}
            </span>
          </div>
        </div>

        {/* Details */}

        <div className="mt-4 space-y-2.5 border-t border-[#EDF1EC] pt-4">
          <div className="flex items-center gap-2 text-xs text-[#77857B]">
            <Award size={15} className="text-[#6D8D73]" />

            <span>{doctor.experience} experience</span>

            <span className="text-[#C0C9C2]">•</span>

            <span>{doctor.reviews} reviews</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#77857B]">
            <MapPin size={15} className="text-[#6D8D73]" />

            <span>{doctor.location}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#77857B]">
            <Video size={15} className="text-[#6D8D73]" />

            <span>
              {Array.isArray(doctor.languages)
                ? doctor.languages.join(" • ")
                : doctor.languages}
            </span>
          </div>
        </div>

        {/* Availability */}

        <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F5F8F4] px-3 py-2.5">
          <div className="flex items-center gap-2">
            <Clock3 size={14} className="text-[#62816A]" />

            <div>
              <p className="text-[9px] font-medium uppercase tracking-wide text-[#98A49B]">
                Next available
              </p>

              <p className="mt-0.5 text-xs font-semibold text-[#425549]">
                {doctor.available}
              </p>
            </div>
          </div>

          <p className="text-sm font-bold text-[#28543A]">
            ₹{doctor.fee}
            <span className="text-[10px] font-medium text-[#8A968D]">
              {" "}
              / session
            </span>
          </p>
        </div>

        {/* Actions */}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="
              rounded-xl
              border
              border-[#C9D9CB]
              bg-white
              py-2.5
              text-xs
              font-semibold
              text-[#38523F]
              transition
              hover:bg-[#F3F7F2]
            "
          >
            View Profile
          </button>

          <Link
            to={`/book?doctor=${encodeURIComponent(doctor.Uid)}`}
            className="
              flex
              items-center
              justify-center
              gap-1.5
              rounded-xl
              bg-[#28543A]
              py-2.5
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-[#214731]
            "
          >
            <CalendarCheck size={14} />
            Book
          </Link>
        </div>
      </div>
    </article>
  );
}
