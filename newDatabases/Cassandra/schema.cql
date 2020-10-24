DROP KEYSPACE IF EXISTS calendar_service;

CREATE KEYSPACE calendar_service WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 } AND durable_writes = 'true';

USE calendar_service;

CREATE TABLE listing_by_id (
  listing_id int,
  cleaning_fee int,
  rating decimal,
  reviews int,
  PRIMARY KEY (listing_id)
);

CREATE TABLE days_by_listing_id (
  day_id int,
  listing_id int,
  date date,
  booked boolean,
  price int,
  PRIMARY KEY (listing_id, day_id)
)

WITH CLUSTERING ORDER BY (day_id ASC);

CREATE TABLE reservations_by_user (
  reservation_id int,
  user_id int,
  check_in text,
  check_out text,
  guest_adults int,
  guest_children int,
  guest_infants int,
  fees_cleaning_fee int,
  fees_base_price int,
  fees_service_fee int,
  fees_taxes int,
  fees_total int,
  PRIMARY KEY (user_id, reservation_id)
);

CREATE TABLE reservations_by_listing (
  reservation_id int,
  listing_id int,
  check_in text,
  check_out text,
  guest_adults int,
  guest_children int,
  guest_infants int,
  fees_cleaning_fee int,
  fees_base_price int,
  fees_service_fee int,
  fees_taxes int,
  fees_total int,
  PRIMARY KEY (listing_id, reservation_id)
);

COPY listing_by_id (listing_id, cleaning_fee, rating, reviews) FROM '/Users/catherinestraus/Desktop/calendar-service/newDatabases/Cassandra/CSV/listingsById.csv' WITH HEADER = TRUE;

COPY days_by_listing_id (day_id, listing_id, date, booked, price) FROM '/Users/catherinestraus/Desktop/calendar-service/newDatabases/Cassandra/CSV/daysByListingId.csv' WITH HEADER = TRUE;

COPY reservations_by_user (reservation_id, user_id, check_in, check_out, guest_adults, guest_children, guest_infants, fees_cleaning_fee, fees_base_price, fees_service_fee, fees_taxes, fees_total) FROM '/Users/catherinestraus/Desktop/calendar-service/newDatabases/Cassandra/CSV/reservationsByUser.csv' WITH HEADER = TRUE ;

COPY reservations_by_listing (reservation_id, listing_id, check_in, check_out, guest_adults, guest_children, guest_infants, fees_cleaning_fee, fees_base_price, fees_service_fee, fees_taxes, fees_total) FROM '/Users/catherinestraus/Desktop/calendar-service/newDatabases/Cassandra/CSV/reservationsByListing.csv' WITH HEADER = TRUE ;