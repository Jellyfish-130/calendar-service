DROP SCHEMA calendar_service CASCADE;

CREATE SCHEMA calendar_service;

CREATE TABLE calendar_service.listing (
  listing_id SERIAL PRIMARY KEY,
  weekend_pricing BOOLEAN,
  cleaning_fee INTEGER NOT NULL,
  lowest_price INTEGER NOT NULL,
  rating NUMERIC (3,2),
  reviews INTEGER NOT NULL
);

CREATE TABLE calendar_service.day (
  day_id SERIAL PRIMARY KEY,
  listing_id INTEGER REFERENCES calendar_service.listings (listing_id),
  date DATE,
  booked BOOLEAN,
  price INTEGER CHECK (price > 0),
  minimum_nights INTEGER CHECK (minimum_nights > 0 AND minimum_nights < 3)
);

CREATE TABLE calendar_service.user (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(24) NOT NULL,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE calendar_service.reservation (
  reservation_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES calendar_service.users (user_id),
  listing_id INTEGER REFERENCES calendar_service.listings (listing_id),
  check_in VARCHAR(24),
  check_out VARCHAR(24),
  guest_adults INTEGER CHECK (guest_adults > 0 AND guest_adults < 7),
  guest_children INTEGER CHECK  (guest_adults < 6),
  guest_infants INTEGER
);


CREATE TABLE calendar_service.billing (
  billing_id SERIAL PRIMARY KEY,
  reservation_id INTEGER REFERENCES calendar_service.reservation (reservation_id),
  cleaning_fee INTEGER CHECK (cleaning_fee > 49 AND cleaning_fee < 101),
  base_price INTEGER NOT NULL,
  service_fee INTEGER NOT NULL,
  taxes INTEGER NOT NULL,
  total INTEGER NOT NULL
);