DROP KEYSPACE IF EXISTS calender_service;

CREATE KEYSPACE calender_service WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 } AND durable_writes = 'true';

USE calender_service;


CREATE TABLE listings (
  listing_id int PRIMARY KEY,
  weekend_pricing boolean,
  cleaning_fee int,
  lowest_price int,
  rating int,
  reviews int
);

CREATE TABLE day (
  day_id int PRIMARY KEY,
  listing_id int,
  date DATE,
  booked boolean,
  price int,
  minimum_nights int
);

CREATE TABLE reservation (
  reservation_id int PRIMARY KEY,
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
);
