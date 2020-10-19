DROP KEYSPACE IF EXISTS calender_service;

CREATE KEYSPACE calender_service WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 } AND durable_writes = 'true';

USE calender_service;

CREATE TABLE listing_by_id (
  listing_id uuid,
  weekend_pricing boolean,
  cleaning_fee int,
  lowest_price int,
  rating int,
  reviews int,
  PRIMARY KEY (listing_id)
);

CREATE TABLE days_by_listing_id (
  day_id uuid,
  listing_id uuid,
  date date,
  booked boolean,
  price int,
  minimum_nights int,
  PRIMARY KEY (listing_id, day_id)
);

CREATE TABLE reservations_by_user (
  reservation_id uuid,
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
  reservation_id uuid,
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

WITH CLUSTERING ORDER BY (days_by_listing ASCENDING)