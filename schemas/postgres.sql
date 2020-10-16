DROP SCHEMA IF EXISTS calendar_service;

CREATE SCHEMA calendar_service;

CREATE TABLE calendar_service.listings (
  listing_id SERIAL PRIMARY KEY,
  weekend_pricing BOOLEAN,
  cleaning_fee INTEGER NOT NULL,
  lowest_price INTEGER NOT NULL,
  rating NUMERIC,
  reviews INTEGER
);

CREATE TABLE calendar_service.day (
  listing_id INTEGER REFERENCES calendar_service.listings (listing_id),
  day_id SERIAL PRIMARY KEY,
  date DATE,
  booked BOOLEAN,
  price INTEGER CHECK (price > 0),
  minimum_nights INTEGER CHECK (0 < minimum_nights < 3)
);

CREATE TABLE calendar_service.reservation (
  listing_id INTEGER REFERENCES calendar_service.listings (listing_id),
  reservation_id SERIAL PRIMARY KEY,
  check_in TEXT,
  check_out TEXT,
  guest_adults INTEGER,
  guest_children INTEGER,
  guest_infants INTEGER,
  fees_cleaning_fee INTEGER NOT NULL,
  fees_base_price INTEGER NOT NULL,
  fees_service_fee INTEGER NOT NULL,
  fees_taxes INTEGER NOT NULL,
  fees_total INTEGER NOT NULL
);