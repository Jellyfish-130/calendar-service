const router = require("express").Router();
const schema = require("../database/schema.js");

/* eslint-disable no-console */
const dayjs = require("dayjs");
const faker = require("faker");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);

// POST Request: add reservation by listing ID
router.route("/listings/:listingId/reservations/").post((req, res) => {
  const { listingId } = req.params;
  const { newBooking } = req.body;

  schema.Listing.findOne({ listing_id: listingId }).then((listing) => {
    newBooking.fees = getFees(listing, newBooking);

    listing.reservations.push(newBooking);

    listing.save((data) => {
      res.status(201).send(newBooking);
    });

    // schema.Listing.updateOne(
    //   { listing_id: listingId },
    //   { $push: { reservations: newBooking } },
    //   { returnNewDocument: true }
    // )
    //   .then((updateMetadata) => {

    //   })
    //   .catch((err) => res.status(400).send(`Error: ${err}`));
  });
});

function getFees(listing, booking) {
  const { cleaningFee, days } = listing;
  let { checkIn, checkOut } = booking;

  checkIn = new Date(checkIn);
  checkOut = new Date(checkOut);

  const nightCount =
    Math.floor(
      // eslint-disable-next-line max-len
      (Date.UTC(
        checkOut.getFullYear(),
        checkOut.getMonth(),
        checkOut.getDate()
      ) -
        Date.UTC(
          checkIn.getFullYear(),
          checkIn.getMonth(),
          checkIn.getDate()
        )) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  // Create an array of the date objects of all selected dates
  const nights = [];
  const bookHold = [];

  const selectedMonthIndex = checkIn.getMonth();
  const selectedDayIndex = checkIn.getDate();

  for (let months = selectedMonthIndex; months < days.length; months += 1) {
    for (let day = selectedDayIndex; day < days[months].length; day += 1) {
      if (nights.length < nightCount) {
        nights.push(days[months][day - 2]);
        bookHold.push([months, day - 2]);
      }
    }
  }

  nights.pop();

  const initial = 0;
  // eslint-disable-next-line max-len
  const basePrice = nights.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    initial
  );
  const serviceFee = Math.ceil(basePrice * 0.0148);
  const taxes = Math.ceil(basePrice * 0.011);
  const total = basePrice + cleaningFee + serviceFee + taxes;

  return {
    cleaningFee: cleaningFee,
    basePrice: basePrice,
    serviceFee: serviceFee,
    taxes: taxes,
    total: total,
  };
}

// **GET Request: get all listings
router.route("/listings/").get((req, res) => {
  schema.Listing.find()
    .then((listings) => res.status(200).send(listings))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

// **GET Request: get listing by listing ID
router.route("/listings/:listingId").get((req, res) => {
  const { listingId } = req.params;
  schema.Listing.findOne({ listing_id: listingId })
    .then((listing) => res.status(200).send(listing))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

// **GET Request: get reservations by listing ID
router.route("/listings/:listingId/reservations").get((req, res) => {
  const { listingId } = req.params;
  schema.Listing.findOne({ listing_id: listingId })
    .then((listing) => res.status(200).send(listing.reservations))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

// **PATCH Request: change reservation by listing ID and reservation ID
router
  .route("/listings/:listingId/reservations/:reservationId")
  .patch((req, res) => {
    const { listingId, reservationId } = req.params;
    const { updatedBooking } = req.body;

    schema.Listing.findOne({ listing_id: listingId }).then((listing) => {
      updatedBooking.fees = getFees(listing, updatedBooking);

      const { reservations } = listing;

      const existingReservation = reservations.find(
        (r) => r.id === reservationId
      );

      Object.assign(existingReservation, updatedBooking);

      schema.Listing.updateOne(
        { listing_id: listingId },
        { reservations },
        { returnNewDocument: true }
      )
        .then((updateMetadata) => {
          res.status(200).send(updatedBooking);
        })
        .catch((err) => res.status(400).send(`Error: ${err}`));
    });
  });

// DELETE Request: delete reservation by listing ID and reservation ID
router
  .route("/listings/:listingId/reservations/:reservationId")
  .delete((req, res) => {
    const { listingId, reservationId } = req.params;

    schema.Listing.findOne({ listing_id: listingId }).then((listing) => {
      const { reservations } = listing;

      const reservationIndex = reservations.findIndex(
        (r) => r.id === reservationId
      );

      // Delete from reservations array
      reservations.splice(reservationIndex, 1);

      schema.Listing.updateOne(
        { listing_id: listingId },
        { reservations },
        { returnNewDocument: true }
      )
        .then((updateMetadata) => {
          res.status(204).send({
            success: true,
            updatedCount: updateMetadata.nModified,
          });
        })
        .catch((err) => res.status(400).send(`Error: ${err}`));
    });
  });

module.exports = router;
