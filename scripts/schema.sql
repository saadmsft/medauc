-- Run this SQL in Supabase SQL Editor
-- This creates the categories and products tables for the medauc marketplace

-- Categories table
create table if not exists categories (
  id serial primary key,
  name text not null,
  slug text unique not null,
  description text,
  icon_name text,
  created_at timestamptz default now()
);

-- Products table
create table if not exists products (
  id serial primary key,
  name text not null,
  price numeric not null,
  brand text,
  status text default 'New' check (status in ('New', 'Used')),
  stock integer default 0,
  moq integer default 1,
  category_slug text references categories(slug),
  image_url text,
  description text,
  specs jsonb,
  seller_id uuid references profiles(id),
  created_at timestamptz default now()
);

-- Enable RLS
alter table categories enable row level security;
alter table products enable row level security;

-- Categories are public read
create policy "Anyone can view categories" on categories for select using (true);

-- Products are public read
create policy "Anyone can view products" on products for select using (true);

-- Sellers can insert their own products
create policy "Sellers can insert products" on products for insert 
  with check (auth.uid() = seller_id);

-- Sellers can update their own products
create policy "Sellers can update own products" on products for update 
  using (auth.uid() = seller_id);

-- Sellers can delete their own products
create policy "Sellers can delete own products" on products for delete 
  using (auth.uid() = seller_id);

-- Create indexes for better query performance
create index if not exists idx_products_category on products(category_slug);
create index if not exists idx_products_brand on products(brand);
create index if not exists idx_products_status on products(status);
create index if not exists idx_products_price on products(price);

-- Full text search on products
alter table products add column if not exists search_vector tsvector 
  generated always as (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(brand, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'C')
  ) stored;

create index if not exists idx_products_search on products using gin(search_vector);
