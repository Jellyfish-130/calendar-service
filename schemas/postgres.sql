DROP SCHEMA IF EXISTS calendar_service;

CREATE SCHEMA calendar_service;

CREATE TABLE calendar_service.listings (
  listing_id SERIAL PRIMARY KEY,
  weekend_pricing BOOLEAN,
  cleaning_fee INTEGER NOT NULL,
  lowest_price INTEGER NOT NULL,
  rating NUMBER (1,2),
  reviews INTEGER NOT NULL
);

CREATE TABLE calendar_service.day (
  listing_id INTEGER REFERENCES calendar_service.listings (listing_id),
  day_id SERIAL PRIMARY KEY,
  date DATE,
  booked BOOLEAN,
  price INTEGER CHECK (price > 0),
  minimum_nights INTEGER CHECK (minimum_nights > 0 && minimum_nights < 3)
);

CREATE TABLE calendar_service.users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  username VARCHAR(24) NOT NULL
)

CREATE TABLE calendar_service.reservation (
  user_id INTEGER REFERENCES calendar_service.users (user_id),
  listing_id INTEGER REFERENCES calendar_service.listings (listing_id),
  reservation_id SERIAL PRIMARY KEY,
  check_in VARCHAR(24),
  check_out VARCHAR(24),
  guest_adults INTEGER CHECK (guest_adults > 0 && guest_adult < 7),
  guest_children INTEGER CHECK  (guest_adults < 6),
  guest_infants INTEGER
);


CREATE TABLE calendar_service.billing (
  reservation_id INTEGER REFERENCES calendar_service.reservation (reservation_id),
  cleaning_fee INTEGER CHECK (fees_cleaning_fee > 49 && fees_cleaning_fee < 101),
  base_price INTEGER NOT NULL,
  service_fee INTEGER NOT NULL,
  taxes INTEGER NOT NULL,
  total INTEGER NOT NULL
)