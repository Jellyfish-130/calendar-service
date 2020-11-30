import http from "k6/http";

export default function () {
  var url = `http://localhost:3002/api/listings/${Math.floor(
    Math.random() * 1000
  )}/reservations/`;
  var payload = JSON.stringify({
    newBooking: {
      checkIn: "2020-11-15T13:00:00.000Z",
      checkOut: "2020-11-17T13:00:00.000Z",
      guestAdults: 1,
      guestChildren: 0,
      guestInfants: 0,
    },
  });
  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  http.post(url, payload, params);
}
