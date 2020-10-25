const router = require("express").Router();
const client = require("../database/index");

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const getFees = (listing, days, booking) => {
  const cleaningFee = listing.cleaning_fee;
  let { checkIn, checkOut } = booking;

  checkIn = new Date(checkIn);
  checkOut = new Date(checkOut);

  const nightCount =
    Math.floor(
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

  const nights = [];

  const selectedMonthIndex = checkIn.getMonth();
  const selectedDayIndex = checkIn.getDate();

  let startGathering = false;
  for (const day of days) {
    const { date } = day;

    const targetDate = new Date(date);

    if (
      targetDate.getMonth() === selectedMonthIndex &&
      targetDate.getDate() === selectedDayIndex
    ) {
      startGathering = true;
    }

    if (startGathering && nights.length < nightCount) {
      nights.push(day);
    }

    if (nights.length >= nightCount) {
      break;
    }
  }

  nights.pop();

  const initial = 0;

  const basePrice = nights.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    initial
  );
  const serviceFee = Math.ceil(basePrice * 0.07);
  const taxes = Math.ceil(basePrice * 0.0725);
  const total = basePrice + cleaningFee + serviceFee + taxes;

  return `${cleaningFee}, ${basePrice}, ${serviceFee}, ${taxes}, ${total}`;
};

// POST Request: add reservation by listing ID
router.route("/listings/:listingId/reservations/").post((req, res) => {
  const { listingId } = req.params;
  const { newBooking } = req.body;

  const checkIn = newBooking.checkIn;
  const checkOut = newBooking.checkOut;
  const guestAdults = newBooking.guestAdults;
  const guestChildren = newBooking.guestChildren;
  const guestInfants = newBooking.guestInfants;

  const userId = Math.floor(Math.random() * 1000000);

  client
    .query(
      `INSERT INTO calendar_service.reservation (user_id, listing_id,check_in, check_out, guest_adults, guest_children, guest_infants) VALUES (${userId}, ${listingId}, '${checkIn}', '${checkOut}', ${guestAdults}, ${guestChildren}, ${guestInfants}) RETURNING *`
    )
    .then((result) => {
      const reservationId = result.rows[0].reservation_id;

      client
        .query(
          `SELECT * FROM calendar_service.listing WHERE listing_id = ${listingId}`
        )
        .then((listing) => {
          client
            .query(
              `SELECT * FROM calendar_service.day WHERE listing_id = ${listingId}`
            )
            .then((days) => {
              return getFees(listing.rows[0], days.rows, newBooking);
            })
            .then((prices) => {
              client.query(
                `INSERT INTO calendar_service.billing (reservation_id, cleaning_fee, base_price, service_fee, taxes, total) VALUES (${reservationId}, ${prices})`
              );
            });
        });
    })

    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

// GET Request: get listing by listing ID
router.route("/listings/:listingId/").get((req, res) => {
  const { listingId } = req.params;

  client
    .query(
      `SELECT * FROM calendar_service.listing WHERE listing_id = ${listingId}`
    )
    .then((result) => res.status(200).send(result.rows[0]))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

// GET Request: get reservations by listing ID
router.route("/listings/:listingId/reservations/").get((req, res) => {
  const { listingId } = req.params;

  client
    .query(
      `SELECT * FROM calendar_service.reservation WHERE listing_id= ${listingId}`
    )
    .then((result) => res.status(200).send(result.rows))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

// GET Request: get reservations by user ID
router.route("/users/:userId/reservations/").get((req, res) => {
  const { userId } = req.params;

  client
    .query(
      `SELECT * FROM calendar_service.reservation WHERE user_id= ${userId}`
    )
    .then((result) => res.status(200).send(result.rows))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

// GET Request: get reservations by listing ID and user ID
router
  .route("/listings/:listingId/users/:userId/reservations/")
  .get((req, res) => {
    const { listingId, userId } = req.params;

    client
      .query(
        `SELECT * FROM calendar_service.reservation WHERE listing_id = ${listingId} AND user_id = ${userId}`
      )
      .then((Result) => res.status(200).send(Result.rows))
      .catch((err) => res.status(400).send(`Error: ${err}`));
  });

//PATCH Request: change reservation by listing ID and reservation ID
//"/api/listings/:listingId/reservations/:reservationId/"
//JSON body

//DELETE Request: reservation by listing ID and reservation ID
//"/api/listings/:listingId/reservations/:reservationId"

module.exports = router;
