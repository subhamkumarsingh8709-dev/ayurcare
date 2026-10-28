alter table public.appointments
  add column if not exists payment_status text not null default 'not_required',
  add column if not exists razorpay_order_id text,
  add column if not exists razorpay_payment_id text,
  add column if not exists payment_expires_at timestamptz;

alter table public.appointments
  alter column status set default 'pending_payment';

alter table public.appointments
  drop constraint if exists appointments_status_check;
alter table public.appointments
  add constraint appointments_status_check
  check (status in ('pending_payment', 'confirmed', 'completed', 'cancelled'));

alter table public.appointments
  drop constraint if exists appointments_payment_status_check;
alter table public.appointments
  add constraint appointments_payment_status_check
  check (payment_status in ('pending', 'paid', 'failed', 'refunded', 'not_required'));

create unique index if not exists appointments_razorpay_order_id_key
  on public.appointments (razorpay_order_id)
  where razorpay_order_id is not null;

create unique index if not exists appointments_razorpay_payment_id_key
  on public.appointments (razorpay_payment_id)
  where razorpay_payment_id is not null;

create table if not exists public.appointment_payments (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null
    references public.appointments (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  razorpay_order_id text not null unique,
  razorpay_payment_id text unique,
  amount integer not null check (amount >= 100),
  currency text not null default 'INR' check (currency = 'INR'),
  status text not null default 'created'
    check (status in ('created', 'paid', 'failed', 'refund_pending', 'refunded')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.appointment_payments enable row level security;

drop policy if exists "Patients can view their appointment payments"
  on public.appointment_payments;
create policy "Patients can view their appointment payments"
  on public.appointment_payments
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create index if not exists appointment_payments_appointment_idx
  on public.appointment_payments (appointment_id, created_at desc);

grant select on public.appointment_payments to authenticated;
grant select, insert, update on public.appointment_payments to service_role;

drop index if exists public.appointments_active_practitioner_slot_key;
create unique index appointments_active_practitioner_slot_key
  on public.appointments (practitioner_id, appointment_date, appointment_time)
  where status in ('pending_payment', 'confirmed', 'completed');

drop policy if exists "Patients can book their own appointments"
  on public.appointments;
revoke insert on public.appointments from authenticated;
grant select on public.appointments to authenticated;
grant select, insert, update on public.appointments to service_role;
