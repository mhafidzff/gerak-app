-- Run this in your Supabase SQL Editor

create table exercise_logs (
  id uuid default gen_random_uuid() primary key,
  person_id text not null check (person_id in ('ica', 'hfz')),
  exercise_date date not null,
  exercise_type text not null check (exercise_type in ('renang', 'jalan', 'lari', 'homeworkout', 'yoga', 'sport')),
  notes text,
  created_at timestamptz default now()
);

-- Enable Row Level Security (allow public read/write — fine for private family app)
alter table exercise_logs enable row level security;

create policy "Allow all" on exercise_logs
  for all using (true) with check (true);
