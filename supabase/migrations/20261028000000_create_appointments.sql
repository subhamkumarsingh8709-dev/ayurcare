create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  practitioner_id text not null,
  practitioner_name text not null,
  practitioner_specialty text not null,
  practitioner_location text not null,
  practitioner_image text not null,
  appointment_date date not null,
  appointment_time text not null
    check (appointment_time ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  consultation_type text not null check (consultation_type in ('video', 'audio')),
  patient_name text not null,
  patient_phone text not null,
  reason text,
  fee numeric(10, 2) not null check (fee >= 0),
  status text not null default 'pending_payment'
    check (status in ('pending_payment', 'confirmed', 'completed', 'cancelled')),
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'failed', 'refunded', 'not_required')),
  razorpay_order_id text,
  razorpay_payment_id text,
  payment_expires_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.appointments enable row level security;

drop policy if exists "Patients can view their appointments"
  on public.appointments;
create policy "Patients can view their appointments"
  on public.appointments
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Patients can book their own appointments"
  on public.appointments;

create unique index if not exists appointments_active_practitioner_slot_key
  on public.appointments (practitioner_id, appointment_date, appointment_time)
  where status in ('pending_payment', 'confirmed', 'completed');

create index if not exists appointments_user_date_idx
  on public.appointments (user_id, appointment_date, appointment_time);

grant select on public.appointments to authenticated;
revoke insert on public.appointments from authenticated;
grant select, insert, update on public.appointments to service_role;
