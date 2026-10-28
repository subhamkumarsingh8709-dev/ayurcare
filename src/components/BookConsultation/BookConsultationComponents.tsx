import type React from "react";
import { Star, UserRound } from "lucide-react";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "tel";
  required?: boolean;
  disabled?: boolean;
}

export function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  disabled = false,
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-[#58705E]">
        {label}
      </label>

      <div className="relative">
        <UserRound
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9BA89F]"
        />

        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="
            h-12 w-full
            rounded-2xl
            border border-[#E1E9DF]
            bg-[#FAFCF9]
            pl-11 pr-4
            text-sm text-[#183322]
            outline-none
            transition
            placeholder:text-[#A4AEA6]
            focus:border-[#7FA887]
            focus:bg-white
            focus:ring-4
            focus:ring-[#7FA887]/10
          "
        />
      </div>
    </div>
  );
}

interface SummaryRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function SummaryRow({ icon, label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF5ED] text-[#52775A]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-[#9AA59D]">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-semibold text-[#38563F]">
          {value}
        </p>
      </div>
    </div>
  );
}

export function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-[#D1A84A]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={11}
          fill={index < Math.round(rating) ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}
