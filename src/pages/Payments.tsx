import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  Download,
  LockKeyhole,
  MoreHorizontal,
  Plus,
  ReceiptText,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

const transactions = [
  {
    id: "AYC-2025-1048",
    practitioner: "Dr. Ananya Sharma",
    service: "Ayurvedic Consultation",
    date: "Aug 02, 2026",
    amount: "₹1,200",
    status: "Paid",
    method: "UPI",
  },
  {
    id: "AYC-2025-1037",
    practitioner: "Dr. Rohan Mehta",
    service: "Follow-up Consultation",
    date: "Jul 28, 2026",
    amount: "₹800",
    status: "Paid",
    method: "Visa •••• 4242",
  },
  {
    id: "AYC-2025-1021",
    practitioner: "Dr. Priya Nair",
    service: "Prakriti Assessment",
    date: "Jul 21, 2026",
    amount: "₹1,500",
    status: "Paid",
    method: "UPI",
  },
  {
    id: "AYC-2025-1014",
    practitioner: "AyurCare Pharmacy",
    service: "Prescription Order",
    date: "Jul 18, 2026",
    amount: "₹640",
    status: "Paid",
    method: "Visa •••• 4242",
  },
];

const paymentMethods = [
  {
    type: "Visa",
    number: "•••• 4242",
    expiry: "Expires 08/28",
    primary: true,
  },
  {
    type: "UPI",
    number: "wellnessuser@upi",
    expiry: "Verified",
    primary: false,
  },
];

export default function Payments() {
  return (
    <main className="min-h-screen bg-[#F6F8F4] text-[#20382A]">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="border-b border-[#E0E8E0] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#78917E]">
                <WalletCards size={15} />
                Account
                <ChevronRight size={13} />
                Payments & Billing
              </div>

              <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#20382A] sm:text-3xl">
                Payments & Billing
              </h1>

              <p className="mt-1 text-sm text-[#7B8D81]">
                Manage your payments, billing details and transaction history.
              </p>
            </div>

            <button
              type="button"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#28543A]
                px-4
                py-3
                text-xs
                font-semibold
                text-white
                shadow-[0_8px_20px_rgba(40,84,58,0.15)]
                transition
                hover:bg-[#1F4630]
              "
            >
              <Plus size={16} />
              Add payment method
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total spent */}

          <SummaryCard
            label="Total spent"
            value="₹4,140"
            description="This month"
            icon={WalletCards}
          />

          {/* Pending */}

          <SummaryCard
            label="Pending"
            value="₹800"
            description="1 upcoming payment"
            icon={Clock3}
          />

          {/* Transactions */}

          <SummaryCard
            label="Transactions"
            value="12"
            description="This year"
            icon={ReceiptText}
          />

          {/* Saved */}

          <SummaryCard
            label="Saved methods"
            value="2"
            description="Cards & UPI"
            icon={CreditCard}
          />
        </div>

        {/* =====================================================
            UPCOMING PAYMENT
        ===================================================== */}

        <section className="mt-7">
          <div
            className="
              relative
              overflow-hidden
              rounded-2xl
              border
              border-[#CFE0D0]
              bg-[#EAF2E9]
              p-5
              sm:p-6
            "
          >
            <div className="absolute -right-12 -top-20 h-48 w-48 rounded-full bg-[#B9CFBA]/25" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-[#3F6F4D]
                    shadow-sm
                  "
                >
                  <CalendarDays size={20} />
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6B8A72]">
                    Upcoming payment
                  </p>

                  <h2 className="mt-1 text-sm font-bold text-[#294333]">
                    Follow-up consultation
                  </h2>

                  <p className="mt-1 text-xs text-[#718277]">
                    Dr. Ananya Sharma · Aug 08, 2026
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-5 sm:justify-end">
                <div>
                  <p className="text-[10px] text-[#7B8D81]">Amount</p>

                  <p className="mt-0.5 text-lg font-bold text-[#28543A]">
                    ₹800
                  </p>
                </div>

                <button
                  type="button"
                  className="
                    rounded-xl
                    border
                    border-[#BFD2C0]
                    bg-white
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-[#3F6F4D]
                    transition
                    hover:bg-[#F8FBF7]
                  "
                >
                  View details
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.65fr_1fr]">
          {/* =================================================
              TRANSACTIONS
          ================================================= */}

          <section>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B8A72]">
                  Billing history
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#20382A]">
                  Recent transactions
                </h2>
              </div>

              <button
                type="button"
                className="
                  hidden
                  items-center
                  gap-1
                  text-xs
                  font-semibold
                  text-[#3F6F4D]
                  transition
                  hover:text-[#28543A]
                  sm:flex
                "
              >
                View all
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[#DDE6DE] bg-white">
              {/* Desktop header */}

              <div className="hidden grid-cols-[1.6fr_1fr_0.7fr_0.7fr_auto] gap-4 border-b border-[#E7EEE7] bg-[#FAFCF9] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A998E] md:grid">
                <span>Service</span>
                <span>Date</span>
                <span>Amount</span>
                <span>Status</span>
                <span />
              </div>

              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="
                    border-b
                    border-[#E7EEE7]
                    px-5
                    py-5
                    last:border-b-0
                    hover:bg-[#FBFDFB]
                  "
                >
                  <div className="grid gap-4 md:grid-cols-[1.6fr_1fr_0.7fr_0.7fr_auto] md:items-center">
                    {/* Service */}

                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#EAF2E9]
                          text-[#3F6F4D]
                        "
                      >
                        <ReceiptText size={18} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#294333]">
                          {transaction.service}
                        </p>

                        <p className="mt-0.5 truncate text-[11px] text-[#89988D]">
                          {transaction.practitioner}
                        </p>

                        <p className="mt-0.5 text-[10px] text-[#A0ACA4]">
                          {transaction.id}
                        </p>
                      </div>
                    </div>

                    {/* Date */}

                    <div>
                      <p className="text-xs text-[#718277]">
                        {transaction.date}
                      </p>

                      <p className="mt-1 text-[10px] text-[#A0ACA4]">
                        {transaction.method}
                      </p>
                    </div>

                    {/* Amount */}

                    <p className="text-sm font-bold text-[#294333]">
                      {transaction.amount}
                    </p>

                    {/* Status */}

                    <div>
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          rounded-full
                          bg-[#E8F3E8]
                          px-2.5
                          py-1
                          text-[10px]
                          font-semibold
                          text-[#477653]
                        "
                      >
                        <CheckCircle2 size={11} />
                        {transaction.status}
                      </span>
                    </div>

                    {/* Invoice */}

                    <button
                      type="button"
                      aria-label={`Download invoice ${transaction.id}`}
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        text-[#7B8D81]
                        transition
                        hover:bg-[#EAF2E9]
                        hover:text-[#3F6F4D]
                      "
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  border-t
                  border-[#E7EEE7]
                  px-5
                  py-4
                  text-xs
                  font-semibold
                  text-[#3F6F4D]
                  transition
                  hover:bg-[#FAFCF9]
                "
              >
                View complete billing history
                <ArrowRight size={14} />
              </button>
            </div>
          </section>

          {/* =================================================
              PAYMENT METHODS
          ================================================= */}

          <section>
            <div className="mb-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6B8A72]">
                Payment
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#20382A]">
                Payment methods
              </h2>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.number}
                  className="
                    rounded-2xl
                    border
                    border-[#DDE6DE]
                    bg-white
                    p-4
                    shadow-[0_4px_16px_rgba(40,84,58,0.03)]
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#EAF2E9]
                        text-[#3F6F4D]
                      "
                    >
                      <CreditCard size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[#294333]">
                          {method.type}
                        </p>

                        {method.primary && (
                          <span
                            className="
                              rounded-full
                              bg-[#E8F3E8]
                              px-2
                              py-0.5
                              text-[9px]
                              font-bold
                              text-[#477653]
                            "
                          >
                            Primary
                          </span>
                        )}
                      </div>

                      <p className="mt-0.5 text-xs text-[#7B8D81]">
                        {method.number}
                      </p>

                      <p className="mt-0.5 text-[10px] text-[#9AA69E]">
                        {method.expiry}
                      </p>
                    </div>

                    <button
                      type="button"
                      aria-label="Payment method options"
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        text-[#9AA69E]
                        transition
                        hover:bg-[#F1F5F0]
                        hover:text-[#4F6756]
                      "
                    >
                      <MoreHorizontal size={17} />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-dashed
                  border-[#BFD2C0]
                  bg-transparent
                  px-4
                  py-4
                  text-xs
                  font-semibold
                  text-[#3F6F4D]
                  transition
                  hover:bg-[#EAF2E9]
                "
              >
                <Plus size={15} />
                Add another payment method
              </button>
            </div>

            {/* Security */}

            <div
              className="
                mt-5
                rounded-2xl
                border
                border-[#DDE6DE]
                bg-white
                p-5
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#EAF2E9]
                    text-[#3F6F4D]
                  "
                >
                  <LockKeyhole size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold text-[#294333]">
                    Your payments are secure
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[#819087]">
                    Your payment information is encrypted and securely
                    processed. AyurCare never stores your complete card details.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-[#E8EEE8] pt-4 text-[10px] text-[#8A998E]">
                <ShieldCheck size={14} className="text-[#5D8265]" />
                Secure payment protection
              </div>
            </div>
          </section>
        </div>

        {/* =====================================================
            BILLING INFORMATION
        ===================================================== */}

        <section className="mt-10">
          <div className="rounded-2xl border border-[#DDE6DE] bg-white p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#EAF2E9]
                    text-[#3F6F4D]
                  "
                >
                  <FileTextIcon />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#294333]">
                    Billing information
                  </h3>

                  <p className="mt-1 max-w-xl text-xs leading-5 text-[#7B8D81]">
                    Keep your billing information up to date for invoices and
                    payment receipts.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#BFD2C0]
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-[#3F6F4D]
                  transition
                  hover:bg-[#F4F8F3]
                "
              >
                Edit billing details
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[#E0E8E0] pt-6 text-[11px] text-[#8A998E] sm:flex-row">
          <p>AyurCare Payments & Billing</p>

          <div className="flex items-center gap-2">
            <ShieldCheck size={13} />
            Secure & encrypted
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

interface SummaryCardProps {
  label: string;
  value: string;
  description: string;
  icon: React.ElementType;
}

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
}: SummaryCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#DDE6DE]
        bg-white
        p-5
        shadow-[0_5px_20px_rgba(40,84,58,0.03)]
      "
    >
      <div className="flex items-start justify-between">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[#EAF2E9]
            text-[#3F6F4D]
          "
        >
          <Icon size={18} />
        </div>

        <span className="text-[10px] font-medium text-[#9AA69E]">
          {description}
        </span>
      </div>

      <p className="mt-5 text-xs font-medium text-[#7B8D81]">{label}</p>

      <p className="mt-1 text-2xl font-bold tracking-tight text-[#294333]">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   SMALL FILE ICON
========================================================= */

function FileTextIcon() {
  return <ReceiptText size={20} />;
}
