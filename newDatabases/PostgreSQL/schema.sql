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
  listing_id INTEGER REFERENCES calendar_service.listing (listing_id),
  date DATE,
  booked BOOLEAN,
  price INTEGER,
  minimum_nights INTEGER
);

CREATE TABLE calendar_service.user (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(24) NOT NULL,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE calendar_service.reservation (
  reservation_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES calendar_service.user (user_id),
  listing_id INTEGER REFERENCES calendar_service.listing (listing_id),
  check_in DATE,
  check_out DATE,
  guest_adults INTEGER,
  guest_children INTEGER,
  guest_infants INTEGER
);

CREATE TABLE calendar_service.billing (
  billing_id SERIAL PRIMARY KEY,
  reservation_id INTEGER REFERENCES calendar_service.reservation (reservation_id),
  cleaning_fee INTEGER,
  base_price INTEGER NOT NULL,
  service_fee INTEGER NOT NULL,
  taxes INTEGER NOT NULL,
  total INTEGER NOT NULL
);

COPY calendar_service.listing (listing_id, weekend_pricing, cleaning_fee, lowest_price, rating, reviews) FROM '/Users/catherinestraus/Desktop/calendar-service/newDatabases/PostgreSQL/CSV/listings.csv' WITH CSV HEADER DELIMITER ',';

COPY calendar_service.day (day_id, listing_id, date, booked, price, minimum_nights) FROM '/Users/catherinestraus/Desktop/calendar-service/newDatabases/PostgreSQL/CSV/days.csv' WITH CSV HEADER DELIMITER ',';

COPY calendar_service.user (user_id, username, email) FROM '/Users/catherinestraus/Desktop/calendar-service/newDatabases/PostgreSQL/CSV/users.csv' WITH CSV HEADER DELIMITER ',';

COPY calendar_service.reservation (reservation_id, user_id, listing_id, check_in, check_out, guest_adults, guest_children, guest_infants) FROM '/Users/catherinestraus/Desktop/calendar-service/newDatabases/PostgreSQL/CSV/reservations.csv' WITH CSV HEADER DELIMITER ',';

COPY calendar_service.billing (billing_id, reservation_id, cleaning_fee, base_price, service_fee, taxes, total) FROM '/Users/catherinestraus/Desktop/calendar-service/newDatabases/PostgreSQL/CSV/billings.csv' WITH CSV HEADER DELIMITER ',';