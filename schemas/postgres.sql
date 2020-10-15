CREATE SCHEMA calender_service;

CREATE TABLE calender_service.listings (
  day_id INTEGER REFERENCES calender_service.day(day_id),
  reservation_id INTEGER REFERENCES calender_service.reservation(reservation_id),
  weekend_pricing BOOLEAN,
  cleaning_fee INTEGER,
  lowest_price INTEGER,
  rating INTEGER,
  reviews INTEGER,
)

CREATE TABLE calender_service.day (
  day_id INTEGER,
  date DATE,
  booked BOOLEAN,
  price INTEGER,
  minimum_nights INTEGER,
)

CREATE TABLE calender_service.reservation (
  reservation_id INTEGER,
  check_in TEXT,
  check_out TEXT,
)

CREATE TABLE calender_service.guests (
  adults INTEGER,
  children INTEGER,
  infants INTEGER,
)

CREATE TABLE calender_service.fees (
  listing_id INTEGER REFERENCES calender_service.listings (listing_id),
  cleaning_fee INTEGER,
  base_price INTEGER,
  service_fee INTEGER,
  taxes INTEGER,
  total INTEGER,
)


-- const listingSchema = new Schema({
--   listing_id: Number,
--   days: [
--     [{
--       date: Date,
--       booked: Boolean,
--       price: Number,
--       minimumNights: Number,
--     }],
--   ],
--   reservations: [
--     {
--       checkIn: String,
--       checkOut: String,
--       guests: {
--         adults: Number,
--         children: Number,
--         infants: Number,
--       },
--       fees: {
--         cleaningFee: Number,
--         basePrice: Number,
--         serviceFee: Number,
--         taxes: Number,
--         total: Number,
--       },
--     },
--   ],
--   weekendPricing: Boolean,
--   cleaningFee: Number,
--   lowestPrice: Number,
--   rating: Number,
--   reviews: Number,
-- });